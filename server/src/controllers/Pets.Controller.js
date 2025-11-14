import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import Category from "../models/Category.Model.js";
import Pets from "../models/Pets.Model.js";
import Shop from "../models/Shop.Model.js";

export const getPet = AsyncHandler(async (req, res) => {});

export const getMyPet = AsyncHandler(async (req, res) => {
  const { shop } = req.user;
  const pets = await Pets.find({ shop: shop }).populate("category");
  res.status(200).json(new ApiSuccess(200, pets, "Data fetched successfully"));
});

export const getSinglePet = AsyncHandler(async (req, res) => {
  const { petId } = req.params;

  const pet = await Pets.findById(petId);
  res.status(200).json(new ApiSuccess(200, pet, "Data fetched successfully"));
});

export const addPet = AsyncHandler(async (req, res) => {
  const { name, description, image, breed, age, gender, category, price } =
    req.body;
  const { _id, shop } = req.user;

  if (
    !name ||
    !description ||
    !image ||
    !breed ||
    !age ||
    !gender ||
    !category ||
    !price
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    throw new ApiError(401, "No Such category exists");
  }

  const existingShop = await Shop.findOne({ _id: shop, user: _id });
  if (!existingShop) {
    throw new ApiError(401, "No Such shop exists");
  }

  const pet = await Pets.create({
    name,
    description,
    image,
    breed,
    age,
    gender,
    category,
    shop,
    price,
  });

  existingShop.pet.push(pet._id);
  await existingShop.save();

  res.status(201).json(new ApiSuccess(201, pet, "Pet created successfully"));
});

export const updatePet = AsyncHandler(async (req, res) => {
  const { name, description, image, breed, age, gender, category, price } =
    req.body;
  const { _id, shop } = req.user;
  const { petId } = req.params;

  if (
    !name ||
    !description ||
    !image ||
    !breed ||
    !age ||
    !gender ||
    !category ||
    !price
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    throw new ApiError(401, "No Such category exists");
  }

  const existingShop = await Shop.findOne({ _id: shop, user: _id });
  if (!existingShop) {
    throw new ApiError(401, "No Such shop exists");
  }

  const pet = await Pets.findByIdAndUpdate(petId, {
    $set: {
      name,
      description,
      image,
      breed,
      age,
      gender,
      category,
      shop,
      price,
    },
  },{new:true});

  res.status(201).json(new ApiSuccess(201, pet, "Pet updated successfully"));
});

export const deletePet = AsyncHandler(async (req, res) => {});
