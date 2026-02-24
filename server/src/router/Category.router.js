import express from "express";
import { verifyAdmin, verifyJWT } from "../middleware/Auth.middleware.js";
import {
  addCategory,
  deactivateCategory,
  getCategories,
  updateCategory,
} from "../controllers/Category.Controller.js";

const router = express.Router();

router.get("/", verifyJWT, getCategories);
router.post("/", verifyJWT, verifyAdmin, addCategory);
router.patch("/:categoryId", verifyJWT, verifyAdmin, updateCategory);
router.delete("/:categoryId", verifyJWT, verifyAdmin, deactivateCategory);

export default router;
