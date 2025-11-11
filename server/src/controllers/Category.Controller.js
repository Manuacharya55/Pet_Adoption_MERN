import Category from "../models/Category.Model.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


// Get All Categories
export const getAllCategory = AsyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiSuccess(200, categories, "Categories retrieved successfully"));
});

export const addCategory = AsyncHandler(async (req, res) => {
  const { categoryName, categoryImg } = req.body;

  if (!categoryName || !categoryImg) {
    throw new ApiError(400, "Category name and image are required");
  }

  const newCategory = await Category.create({
    categoryName,
    categoryImg,
  });
  res
    .status(201)
    .json(new ApiSuccess(201, newCategory, "Category added successfully"));
});

// Update Category (Toggle isActive)
export const updateCategory = AsyncHandler(async (req, res) => {
  const { categoryId } = req.params;
const { categoryName, categoryImg } = req.body;
  if (!categoryId) {
    throw new ApiError(400, "Category ID is required");
  }

  // Find the category first to get current isActive value
  const category = await Category.findByIdAndUpdate(categoryId,{$set:{categoryName,categoryImg}},{ new: true });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res
    .status(200)
    .json(
      new ApiSuccess(200, category, "Category updated successfully")
    );
});

