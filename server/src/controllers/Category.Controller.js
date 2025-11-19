import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import Category from "../models/Category.Model.js";

export const getCategories = AsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res
    .status(200)
    .json(new ApiSuccess(200, categories, "Fetched all categories"));
});

export const addCategory = AsyncHandler(async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    throw new ApiError(401, "All fields are required");
  }

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw new ApiError(401, "Already category exists");
  }

  const category = await Category.create({ name: name, image: image });

  res
    .status(200)
    .json(new ApiSuccess(201, category, "Category added successfully"));
});

export const updateCategory = AsyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const { categoryId } = req.params;

  if ((!name, image)) {
    throw new ApiError(401, "All fields are required");
  }

  const category = await Category.findByIdAndUpdate(
    categoryId,
    { $set: { name, image } },
    { new: true }
  );

  if (!category) {
    throw new ApiError(401, "No such category exists");
  }
  res
    .status(200)
    .json(new ApiSuccess(201, category, "Category updated successfully"));
});

export const deactivateCategory = AsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const existingCategory = await Category.findById(categoryId);
  if (!existingCategory) {
    throw new ApiError(401, "No such category");
  }

  existingCategory.isActive = !existingCategory.isActive;
  await existingCategory.save();

  res
    .status(200)
    .json(new ApiSuccess(200, existingCategory, "updated successfully"));
});
