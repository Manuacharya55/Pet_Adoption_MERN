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

  console.log(existingAddress);
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

  const existingAddress = await Address.findByIdAndUpdate(addressId, {
    $set: {
      country: country,
      state: state,
      district: district,
      phonenumber: phonenumber,
      address: address,
      lat: lat,
      lng: lng,
    },
  },{new:true});

  if (!existingAddress) {
    throw new ApiError(400, "No Such Address exists");
  }

  res
    .status(201)
    .json(new ApiSuccess(201, existingAddress, "Address added successfully"));
});

export const getAddress = AsyncHandler(async(req,res)=>{
  const {addressId} = req.params;

  if(!addressId){
    throw new ApiError(401,"No such address")
  }

  const address = await Address.findById(addressId);

  if(!address){
    throw new ApiError(401,"No such address")
  }

  res.status(201).json(new ApiSuccess(201,address,"address fetched successfully"))
})