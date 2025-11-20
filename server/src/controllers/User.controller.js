import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import User from "../models/User.Model.js";
import Pets from "../models/Pets.Model.js";
import Wishlist from "../models/Wishlist.Model.js";

export const createUser = AsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(401, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(401, "User exists with this email");
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  const token = await user.generateToken();

  const data = {
    token: token,
    role: user.role,
    email: user.email,
  };

  res.status(201).json(new ApiSuccess(201, data, "User Created Successfully"));
});

export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new ApiError(401, "No Such User");
  }

  const token = await existingUser.generateToken();

  const data = {
    _id: existingUser._id,
    fullname: existingUser.fullname,
    email: existingUser.email,
    address: existingUser.address,
    token,
    role:existingUser.role
  };
  res
    .status(200)
    .json(new ApiSuccess(200, data, "User Logged in Successfully"));
});

export const userProfile = AsyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id).select("-password");

  if (!existingUser) {
    throw new ApiError(401, "User not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, existingUser, "Profile fetched successfully"));
});

export const updateProfile = AsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { email, fullname, avatar } = req.body;
  const existingUser = await User.findByIdAndUpdate(
    _id,
    { $set: { fullname, email, avatar } },
    { new: true }
  );

  if (!existingUser) {
    throw new ApiError(401, "User not found");
  }

  res
    .status(201)
    .json(new ApiSuccess(201, existingUser, "Profile updated successfully"));
});

export const getWishlist = AsyncHandler(async (req, res) => {
  const { _id } = req.user;

  const wishlist = await Wishlist.find({ user: _id })
  .populate([
    {
      path: "pet",
      select:"name price image",
      populate: {
        path: "category",
        select:"name"
      }
    }
  ]);

  res.status(200).json(new ApiSuccess(200, wishlist, "Fetched your wishlist"));
});

export const addTowishlist = AsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { petId } = req.params;

  const existingPet = await Pets.findById(petId);

  if (!existingPet) {
    throw new ApiError(404, "No such pets");
  }

  const existingWishlist = await Wishlist.findOne({ user: _id, pet: petId });

  if (existingWishlist) {
    res.status(201).json(new ApiSuccess(201, "", "Pet added to wishlist"));
  }
  const wishlist = await Wishlist.create({
    user: _id,
    pet: petId,
  });

  res.status(201).json(new ApiSuccess(201, wishlist, "Pet added to wishlist"));
});

export const removeFromwishlist = AsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { petId } = req.params;

  const existingPet = await Pets.findById(petId);

  if (!existingPet) {
    throw new ApiError(404, "No such pets");
  }

  const existingWishlist = await Wishlist.deleteOne({ user: _id, pet: petId });

  if (!existingWishlist) {
    throw new ApiError(401, "No Such Pets in Wishlist");
  }

  res
    .status(201)
    .json(new ApiSuccess(201, existingWishlist, "Pet removed from wishlist"));
});
