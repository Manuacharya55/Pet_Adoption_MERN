import { AsyncHandler } from "../utils/AsyncHandler.js";
import Pets from "../models/Pets.Model.js";
import Shops from "../models/Shop.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import Adoption from "../models/Adoption.Model.js";
import { sendEmail } from "../utils/Mail.js";
import { sendBulkMail } from "../utils/SendBulkMail.js";

export const addAdoption = AsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { shop: shopId, pet: petId } = req.body;

  const existingRequest = await Adoption.findOne({
    user: _id,
    pet: petId,
    shop: shopId,
  });

  if (existingRequest) {
    throw new ApiError(400, "You have sent an adoption request to this pet");
  }
  const existingPet = await Pets.findOne({
    _id: petId,
    isActive: true,
    isAdopted: false,
  });

  if (!existingPet) {
    throw new ApiError(401, "Pet not found");
  }

  const existingShop = await Shops.findById(shopId);

  if (!existingShop) {
    throw new ApiError(401, "Shop not found");
  }

  const adoption = await Adoption.create({
    user: _id,
    pet: petId,
    shop: shopId,
  });

  res.status(201).json(new ApiSuccess(201, adoption, "Adoption request sent"));
});

export const getActiveAdoptionRequest = AsyncHandler(async (req, res) => {
  const { shop: shopId } = req.user;

  const existingShop = await Shops.findById(shopId);

  if (!existingShop) {
    throw new ApiError(401, "Shop not found");
  }

  const requests = await Pets.aggregate([
    {
      $match: { shop: shopId },
    },
    {
      $lookup: {
        from: "adoptions",
        let: { petId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$pet", "$$petId"] } } },
          { $match: { status: "pending" } },
        ],
        as: "adoptionDetails",
      },
    },
    { $unwind: "$adoptionDetails" },
  ]);

  res
    .status(200)
    .json(new ApiSuccess(200, requests, "Data fetched successfully"));
});

export const getSingleAdoptionRequest = AsyncHandler(async (req, res) => {
  const { petId } = req.params;

  const [pet, request] = await Promise.all([
    await Pets.findById(petId).populate("category"),
    await Adoption.find({ pet: petId, status: "pending" }).populate([
      {
        path: "user",
        select: "fullname avatar email",
        populate: {
          path: "address",
          select: "phonenumber",
        },
      },
    ]),
  ]);

  const data = {
    pet,
    request,
  };
  res.status(200).json(new ApiSuccess(200, data, "Data fetched successfully"));
});

export const getAdoptionRequestHistory = AsyncHandler(async (req, res) => {
  const { shop: shopId } = req.user;
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * 10;

  const existingShop = await Shops.findById(shopId);

  if (!existingShop) {
    throw new ApiError(401, "Shop not found");
  }

  const count = await Adoption.countDocuments({
    shop: shopId,
    status: { $ne: "pending" },
  });
  const requests = await Adoption.find({
    shop: shopId,
    status: { $ne: "pending" },
  })
    .populate([
      {
        path: "user",
        select: "fullname",
      },
      {
        path: "pet",
        select: "name avatar price",
      },
    ])
    .skip(skip)
    .limit(limit);

  const data = {
    history: requests,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
  res
    .status(200)
    .json(new ApiSuccess(200, data, "Details fetched successfully"));
});

export const updateRequests = AsyncHandler(async (req, res) => {
  const { petId } = req.params;
  const { adoptionId, status } = req.body;

  let response;

  if (status === "rejected") {
    response = await Adoption.findByIdAndUpdate(
      adoptionId,
      { $set: { status: "rejected" } },
      { new: true }
    );

    const adoption = await Adoption.findById(adoptionId).populate([
      {
        path: "user",
        select: "email fullname",
      },
      {
        path: "pet",
        select: "name",
        populate: {
          path: "category",
          select: "name",
        },
      },
    ]);

    const data = {
      email: adoption?.user?.email,
      fullname: adoption?.user?.fullname,
      petName: adoption?.pet?.name,
      category: adoption?.pet?.category?.name,
      status: adoption?.status,
      adoptionId: adoption?._id,
    };

    const result = await sendEmail(data);
    response.mail = result;
  } else if (status === "approved") {
    // approve selected
    const approved = await Adoption.findByIdAndUpdate(
      adoptionId,
      { $set: { status: "approved" } },
      { new: true }
    );

    // reject others
    await Adoption.updateMany(
      {
        pet: petId,
        _id: { $ne: adoptionId },
      },
      { $set: { status: "rejected" } }
    );

    response = approved;
    await sendBulkMail();
  }

  res.status(200).json(new ApiSuccess(200, response, "updated successfully"));
});
