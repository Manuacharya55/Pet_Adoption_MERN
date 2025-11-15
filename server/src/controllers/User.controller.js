import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import User from "../models/User.Model.js";

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
    token : token,
    role : user.role,
    email : user.email
  }

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
