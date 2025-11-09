import express from "express";
import {
  getAllShops,
  addShop,
  editShop,
} from "../controllers/Shop.Controller.js";

const router = express.Router();

// Get All Shops
router.get("/", getAllShops);

// Add Shop
router.post("/", addShop);

// Edit Shop (Get by ID or Update)
router.get("/:shopId", editShop);
router.put("/:shopId", editShop);

export default router;

