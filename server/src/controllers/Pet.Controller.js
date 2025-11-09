import Pet from "../models/Pet.Model.js";
import Category from "../models/Category.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// Get All Pets with Pagination
export const getAllPets = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Optional filters
  const { category, gender, sortBy } = req.query;

  // Build filter object
  const filter = {};
  if (category) filter.category = category;
  if (gender) filter.gender = gender;

  // Get total count for pagination
  const total = await Pet.countDocuments(filter);

  // Get pets with pagination and populate category
  const pets = await Pet.find(filter)
    .populate("category", "categoryName categoryImg isActive")
    .sort({ createdAt: -1, sortBy })
    .skip(skip)
    .limit(limit);

  const data = {
    pets,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };

  res
    .status(200)
    .json(new ApiSuccess(200, data, "Pets retrieved successfully"));
});

// Get Pet by ID
export const getPetById = AsyncHandler(async (req, res) => {
  const { petId } = req.params;

  if (!petId) {
    throw new ApiError(400, "Pet ID is required");
  }
  const pet = await Pet.findById(petId).populate(
    "category",
    "categoryName categoryImg isActive"
  );
  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  res.status(200).json(new ApiSuccess(200, pet, "Pet retrieved successfully"));
});

// Add Pet
export const addPet = AsyncHandler(async (req, res) => {
  const {
    petName,
    breed,
    category,
    vaccinatedAt,
    year,
    gender,
    price,
    image,
    description,
  } = req.body;

  if (
    !petName ||
    !breed ||
    !category ||
    !vaccinatedAt ||
    !year ||
    !gender ||
    !price ||
    !image ||
    !description
  ) {
    throw new ApiError(400, "Please provide all required fields");
  }
  const newPet = await Pet.create({
    petName,
    breed,
    category,
    vaccinatedAt,
    year,
    gender,
    price,
    image,
    description,
  });
  if (!newPet) {
    throw new ApiError(400, "Failed to add pet");
  }
  res.status(201).json(new ApiSuccess(201, newPet, "Pet added successfully"));
});

// Update Pet
export const updatePet = AsyncHandler(async (req, res) => {
  const { petId } = req.params;
  const {
    petName,
    breed,
    category,
    vaccinatedAt,
    year,
    gender,
    price,
    image,
    description,
    isAdopted,
  } = req.body;

  if (!petId) {
    throw new ApiError(400, "Pet ID is required");
  }

  const updatedPet = await Pet.findByIdAndUpdate(
    petId,
    {
      $set: {
        petName,
        breed,
        category,
        vaccinatedAt,
        year,
        gender,
        price,
        image,
        description,
        isAdopted,
      },
    },
    { new: true }
  ).populate("category", "categoryName categoryImg isActive");
  if (!updatedPet) {
    throw new ApiError(404, "Pet not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, updatedPet, "Pet updated successfully"));
});

// Delete Pet
export const deletePet = AsyncHandler(async (req, res) => {
  const { petId } = req.params;

  if (!petId) {
    throw new ApiError(400, "Pet ID is required");
  }

  const pet = await Pet.findByIdAndDelete(petId);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  res.status(200).json(new ApiSuccess(200, null, "Pet deleted successfully"));
});
