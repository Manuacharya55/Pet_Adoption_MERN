import User from "../models/User.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { generateToken } from "../utils/GenerateToken.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Address from "../models/Address.Model.js";

// Register User
export const registerUser = AsyncHandler(async (req, res) => {
  const { fullname, email, password, avatar } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    avatar: avatar || "",
  });

  const token = generateToken(user._id);

  const data = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
    token: token,
  };
  res
    .status(201)
    .json(new ApiSuccess(201, data, "User registered successfully"));
});

// Login User
export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  const data = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
    token: token,
  };

  res.status(200).json(new ApiSuccess(200, data, "Login successful"));
});

// Get User Profile
export const profile = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log(userId);
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const address = await Address.findOne({user: userId});
  // Convert to object and remove password
  const data = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
    address: address,
  };
  
  res
    .status(200)
    .json(new ApiSuccess(200, data, "Profile retrieved successfully"));
});


// Update User Profile
export const updateProfile = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const { fullname, email, avatar } = req.body;

  // Find user
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { fullname, email, avatar } },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const data = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
  };

  res
    .status(200)
    .json(new ApiSuccess(200, data, "Profile updated successfully"));
});
