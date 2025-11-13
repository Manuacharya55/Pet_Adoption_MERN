import express from "express"
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { addShop } from "../controllers/Shop.controller.js";


const router = express.Router();

router.post("/register",verifyJWT,addShop);
// router.patch("/:shopId",verifyJWT,updateAddress);

export default router;