import express from "express";
import { addAddress, updateAddress } from "../controllers/Address.Controller.js";

const router = express.Router();

// Add Address
router.post("/", addAddress);

// Update Address
router.put("/:addressId", updateAddress);

export default router;

