import express from "express";
import {
  registerUser,
  loginUser,
  profile,
  updateProfile,
} from "../controllers/Auth.Controller.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get User Profile
router.get("/profile", profile);

// Update User Profile
router.put("/profile", updateProfile);

export default router;

