import express from "express"
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { addShop, getShops, getSingleShop, updateShop } from "../controllers/Shop.controller.js";


const router = express.Router();

router.post("/register",verifyJWT,addShop);
router.get("/",verifyJWT,getShops);
router.get("/:shopId",verifyJWT,getSingleShop);
router.patch("/:shopId",verifyJWT,updateShop);

export default router;