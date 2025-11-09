import Address from "../models/Address.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// Add Address
export const addAddress = AsyncHandler(async (req, res) => {
  const { phonenumber, address, district, state, lng, lat } = req.body;

  if (!phonenumber || !address || !district || !state || !lng || !lat) {
    throw new ApiError(400, "Please provide all required fields");
  }

  if (typeof Number(lng) !== "number" || typeof Number(lat) !== "number") {
    throw new ApiError(400, "Longitude and latitude must be numbers");
  }

  const newAddress = await Address.create({
    phonenumber,
    address,
    district,
    state,
    lng: Number(lng),
    lat: Number(lat),
  });

  res
    .status(201)
    .json(new ApiSuccess(201, newAddress, "Address added successfully"));
});

// Update Address
export const updateAddress = AsyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { phonenumber, address, district, state, lng, lat } = req.body;

  if (!addressId) {
    throw new ApiError(400, "Address ID is required");
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    {
      $set: {
        phonenumber,
        address,
        district,
        state,
        lng: Number(lng),
        lat: Number(lat),
      },
    },
    { new: true }
  );
  if (!updatedAddress) {
    throw new ApiError(404, "Address not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, updatedAddress, "Address updated successfully"));
});
