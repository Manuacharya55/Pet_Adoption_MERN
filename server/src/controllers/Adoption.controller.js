import { AsyncHandler } from "../utils/AsyncHandler.js";
import Pets from "../models/Pets.Model.js";
import Shops from "../models/Shop.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import Adoption from "../models/Adoption.Model.js";

export const addAdoption = AsyncHandler(async (req, res) => {
  const { _id} = req.user;
  const {shop:shopId,pet:petId} = req.body

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
    $match: { shop: shopId }   
  },
  {
    $lookup: {
      from: "adoptions",
      let: { petId: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$pet", "$$petId"] } } },
        { $match: { status: "pending" } }
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

export const getSingleAdoptionRequest = AsyncHandler(async(req,res)=>{
  const {petId} = req.params

  const request = await Adoption.find({pet:petId,status:"pending"}).populate([
    {
      path:"user",
      select:"fullname avatar email"
    },{
      path:"pet",
      select:"image name age"
    }
  ])

  res.status(200).json(new ApiSuccess(200,request,"Data fetched successfully"))
})

export const getAdoptionRequestHistory = AsyncHandler(async (req, res) => {
  const { shop: shopId } = req.body;

  const existingShop = await Shops.findById(shopId);

  if (!existingShop) {
    throw new ApiError(401, "Shop not found");
  }

  const requests = await Adoption.find({
    shop: shopId,
    status: { $ne: "pending" },
  }).populate([
    {
      path: "user",
      select: "fullname",
    },
    {
      path: "pet",
      select: "name avatar price",
    },
  ]);

  res
    .status(200)
    .json(new ApiSuccess(200, requests, "Details fetched successfully"));
});

export const updateRequests = AsyncHandler(async (req, res) => {});
