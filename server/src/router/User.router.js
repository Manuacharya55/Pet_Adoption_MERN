import express from "express"
import { createUser, loginUser, userProfile } from "../controllers/User.controller.js";
import { verifyJWT } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/profile",verifyJWT,userProfile);

export default router;