import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import Category from "../models/Category.Model.js";


export const getCategories = AsyncHandler(async(req,res)=>{
    const categories = await Category.find();
    res.status(200).json(new ApiSuccess(200,categories,"Fetched all categories"));
})

export const addCategory = AsyncHandler(async (req, res) => {
  const { name, image } = req.body;

  console.log(name,image)
  if ((!name || !image)) {
    throw new ApiError(401, "All fields are required");
  }

  const existingCategory = await Category.findOne({ name });

  console.log(existingCategory)
  if (existingCategory) {
    throw new ApiError(401, "Already category exists");
  }

  console.log("here")
  const category = await Category.create({ name:name, image:image });
  console.log(category)
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
  req
    .status(200)
    .json(new ApiSuccess(201, category, "Category updated successfully"));
});
