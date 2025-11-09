import express from "express";
import {
  getActiveCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/Category.Controller.js";

const router = express.Router();

// Get Active Categories
router.get("/active", getActiveCategory);

// Get All Categories
router.get("/", getAllCategory);

// Update Category (Toggle isActive)
router.put("/:categoryId", updateCategory);

export default router;

