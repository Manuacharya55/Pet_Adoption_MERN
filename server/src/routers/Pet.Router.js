import express from "express";
import {
  getAllPets,
  getPetById,
  addPet,
  updatePet,
  deletePet,
} from "../controllers/Pet.Controller.js";

const router = express.Router();

// Get All Pets
router.get("/", getAllPets);

// Get Pet by ID
router.get("/:petId", getPetById);

// Add Pet
router.post("/", addPet);

// Update Pet
router.put("/:petId", updatePet);

// Delete Pet
router.delete("/:petId", deletePet);

export default router;

