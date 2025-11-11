import express from "express";
import {
  addCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/Category.Controller.js";

const router = express.Router();

// Get Active Categories
// router.get("/active", getActiveCategory);

// Get All Categories
router.get("/", getAllCategory);
router.post("/", addCategory);
// Update Category (Toggle isActive)
router.patch("/:categoryId", updateCategory);

export default router;

