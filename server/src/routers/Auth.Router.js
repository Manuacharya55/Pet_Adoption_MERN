import express from "express";
import {
  registerUser,
  loginUser,
  profile,
  updateProfile,
} from "../controllers/Auth.Controller.js";
import { verifyUser } from "../middlewares/Auth.Middleware.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get User Profile
router.get("/profile/", verifyUser,profile);

// Update User Profile
router.patch("/profile", verifyUser,updateProfile);

export default router;

