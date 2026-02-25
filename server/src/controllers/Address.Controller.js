import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import User from "../models/User.Model.js";
import Address from "../models/Address.Model.js";

export const addAddress = AsyncHandler(async (req, res) => {
  const { country, state, district, phonenumber, address, lat, lng } = req.body;
  const { _id } = req.user;

  if (
    !country ||
    !state ||
    !district ||
    !phonenumber ||
    !address ||
    !lat ||
    !lng
  ) {
    throw ApiError(401, "All fields are required");
  }

  const existingAddress = await Address.findOne({ user: _id });

  if (existingAddress) {
    throw new ApiError(400, "Address exists already");
  }

  const newAddress = await Address.create({
    country,
    state,
    district,
    phonenumber,
    address,
    lat,
    lng,
    user: _id,
  });

  const user = await User.findByIdAndUpdate(_id, {
    $set: { address: newAddress._id },
  });

  res
    .status(201)
    .json(new ApiSuccess(201, newAddress, "Address added successfully"));
});

export const updateAddress = AsyncHandler(async (req, res) => {
  const { country, state, district, phonenumber, address, lat, lng } = req.body;
  const { addressId } = req.params;

  const updates = {};
  if (country) updates.country = country;
  if (state) updates.state = state;
  if (district) updates.district = district;
  if (phonenumber) updates.phonenumber = phonenumber;
  if (address) updates.address = address;
  if (lat) updates.lat = lat;
  if (lng) updates.lng = lng;

  const existingAddress = await Address.findOneAndUpdate(
    { _id: addressId, user: req.user._id },
    {
      $set: updates,
    },
    { new: true }
  );

  if (!existingAddress) {
    throw new ApiError(
      403,
      "Address not found or you do not have permission to update it"
    );
  }

  res
    .status(200)
    .json(new ApiSuccess(200, existingAddress, "Address updated successfully"));
});

export const getAddress = AsyncHandler(async (req, res) => {
  const { addressId } = req.params;

  if (!addressId) {
    throw new ApiError(401, "No such address");
  }

  const address = await Address.findOne({ _id: addressId, user: req.user._id });

  if (!address) {
    throw new ApiError(
      403,
      "Address not found or you do not have permission to view it"
    );
  }

  res.status(201).json(new ApiSuccess(201, address, "address fetched successfully"))
})