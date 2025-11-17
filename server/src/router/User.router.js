import express from "express";
import {
  addTowishlist,
  createUser,
  getWishlist,
  loginUser,
  removeFromwishlist,
  updateProfile,
  userProfile,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", verifyJWT, userProfile);
router.patch("/profile", verifyJWT, updateProfile);

router.get("/wishlist", verifyJWT, getWishlist);
router
  .route("/wishlist/:petId")
  .post(verifyJWT, addTowishlist)
  .delete(verifyJWT, removeFromwishlist);

export default router;
