import Adoption from "../models/Adoption.Model.js";
import User from "../models/User.Model.js";
import Address from "../models/Address.Model.js";
import Pet from "../models/Pet.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// Get Adoption (Get all adoptions or by ID)
export const getAdoption = AsyncHandler(async (req, res) => {
    const {petId} = req.params;

    if (!petId) {
        throw new ApiError(400, "Pet ID is required");
    }

    const existingPet = await Pet.findById(petId);
    if (!existingPet) {
        throw new ApiError(404, "Pet not found");
    }

    const adoption = await Adoption.find({ pet: petId });

  res
    .status(200)
    .json(new ApiSuccess(200, adoption, "Adoptions retrieved successfully"));
});

// Add Adoption
export const addAdoption = AsyncHandler(async (req, res) => {
  const { user, address, pet } = req.body;

  if (!user || !address || !pet) {
    throw new ApiError(400, "Please provide all required fields");
  }

  // Validate if user exists
  const userExists = await User.findById(user);
  if (!userExists) {
    throw new ApiError(404, "User not found");
  }

  // Validate if address exists
  const addressExists = await Address.findById(address);
  if (!addressExists) {
    throw new ApiError(404, "Address not found");
  }

  // Validate if pet exists
  const petExists = await Pet.findById(pet);
  if (!petExists) {
    throw new ApiError(404, "Pet not found");
  }

  // Check if pet is already adopted
  if (petExists.isAdopted) {
    throw new ApiError(400, "Pet is already adopted");
  }

  // Check if user has already requested adoption for this pet
  const existingAdoption = await Adoption.findOne({ user, pet });
  if (existingAdoption) {
    throw new ApiError(400, "You have already requested adoption for this pet");
  }

  const newAdoption = await Adoption.create({
    user,
    address,
    pet,
    status: "pending",
    dateOfRequest: new Date(),
  });

  const adoption = await Adoption.findById(newAdoption._id)
    .populate("user", "fullname email avatar")
    .populate("address")
    .populate("pet");

  res
    .status(201)
    .json(new ApiSuccess(201, adoption, "Adoption request created successfully"));
});

// Update Adoption
export const updateAdoption = AsyncHandler(async (req, res) => {
  const { adoptionId } = req.params;
  const { status } = req.body;

  if (!adoptionId) {
    throw new ApiError(400, "Adoption ID is required");
  }

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  // Validate status
  if (!["pending", "rejected", "approved"].includes(status)) {
    throw new ApiError(400, "Status must be pending, rejected, or approved");
  }

  // Find adoption
  const adoption = await Adoption.findById(adoptionId).populate("pet");

  if (!adoption) {
    throw new ApiError(404, "Adoption not found");
  }

  // Update adoption status
  const updatedAdoption = await Adoption.findByIdAndUpdate(
    adoptionId,
    { $set: { status } },
    { new: true }
  )
    .populate("user", "fullname email avatar")
    .populate("address")
    .populate("pet");

  // If status is approved, mark pet as adopted
  if (status === "approved") {
    await Pet.findByIdAndUpdate(adoption.pet._id, {
      $set: { isAdopted: true },
    });
  }

  // If status is rejected or pending, and pet was previously marked as adopted for this adoption,
  // we might want to mark it as not adopted (optional - depends on business logic)
  // For now, we'll only mark as adopted when approved

  res
    .status(200)
    .json(new ApiSuccess(200, updatedAdoption, "Adoption updated successfully"));
});

