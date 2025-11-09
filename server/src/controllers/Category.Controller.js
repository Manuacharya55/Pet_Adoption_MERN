import Category from "../models/Category.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// Get Active Categories
export const getActiveCategory = AsyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(
      new ApiSuccess(200, categories, "Active categories retrieved successfully")
    );
});

// Get All Categories
export const getAllCategory = AsyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiSuccess(200, categories, "Categories retrieved successfully"));
});

// Update Category (Toggle isActive)
export const updateCategory = AsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(400, "Category ID is required");
  }

  // Find the category first to get current isActive value
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Toggle isActive
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { $set: { isActive: !category.isActive } },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiSuccess(200, updatedCategory, "Category updated successfully")
    );
});

