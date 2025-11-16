import express from "express"
import { createUser, loginUser, updateProfile, userProfile } from "../controllers/User.controller.js";
import { verifyJWT } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/profile",verifyJWT,userProfile);
router.patch("/profile",verifyJWT,updateProfile);

export default router;