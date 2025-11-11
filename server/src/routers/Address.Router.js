import express from "express";
import { addAddress, updateAddress } from "../controllers/Address.Controller.js";
import { verifyUser } from "../middlewares/Auth.Middleware.js";

const router = express.Router();

// Add Address
router.post("/", verifyUser,addAddress);

// Update Address
router.patch("/:addressId",verifyUser, updateAddress);

export default router;

