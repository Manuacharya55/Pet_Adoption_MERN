import express from "express"
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { addShop, getShops, getSingleShop } from "../controllers/Shop.controller.js";


const router = express.Router();

router.post("/register",verifyJWT,addShop);
router.get("/",verifyJWT,getShops);
router.get("/:shopId",verifyJWT,getSingleShop);
// router.patch("/:shopId",verifyJWT,updateAddress);

export default router;