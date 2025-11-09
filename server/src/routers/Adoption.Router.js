import express from "express";
import {
  getAdoption,
  addAdoption,
  updateAdoption,
} from "../controllers/Adoption.Controller.js";

const router = express.Router();

// Get Adoption (All or by ID)
router.get("/", getAdoption);
router.get("/:adoptionId", getAdoption);

// Add Adoption
router.post("/", addAdoption);

// Update Adoption
router.put("/:adoptionId", updateAdoption);

export default router;

