import Shop from "../models/Shop.Model.js";
import Address from "../models/Address.Model.js";
import User from "../models/User.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// Get All Shops
export const getAllShops = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Get total count for pagination
  const total = await Shop.countDocuments();

  // Get shops with pagination and populate address and user
  const shops = await Shop.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const data = {
    shops,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };

  res
    .status(200)
    .json(new ApiSuccess(200, data, "Shops retrieved successfully"));
});

// Add Shop
export const addShop = AsyncHandler(async (req, res) => {
  const { shopname, email, image, userId } = req.body;
  const { user } = req.user;

  const existingUser = await User.findById(user._id);

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  if (!shopname || !email || !userId) {
    throw new ApiError(400, "Please provide all required fields");
  }

  // Validate if address exists
  const addressExists = await Address.findById(existingUser.address);

  if (!addressExists) {
    throw new ApiError(404, "Address not found");
  }

  // Check if shop with email already exists
  const existingShop = await Shop.findOne({ email });
  if (existingShop) {
    throw new ApiError(400, "Shop with this email already exists");
  }

  const shop = await Shop.create({
    shopname,
    email,
    image: image || "",
    address: existingUser.address,
    userId: existingUser._id,
  });

  res.status(201).json(new ApiSuccess(201, shop, "Shop added successfully"));
});

// Edit Shop (Get Shop by ID or Update Shop)
export const editShop = AsyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const { shopname, email, image } = req.body;

  if (!shopId) {
    throw new ApiError(400, "Shop ID is required");
  }

  // If body has update fields, update the shop
  if (!shopname || !email || !image) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const updatedShop = await Shop.findByIdAndUpdate(
    shopId,
    { $set: { shopname, email, image } },
    { new: true }
  );

  if (!updatedShop) {
    throw new ApiError(404, "Shop not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, updatedShop, "Shop updated successfully"));
});
