import express from "express"
import { addAddress, getAddress, updateAddress } from "../controllers/Address.Controller.js";
import { verifyJWT } from "../middleware/Auth.middleware.js";


const router = express.Router();

router.post("/",verifyJWT,addAddress);
router.patch("/:addressId",verifyJWT,updateAddress)
router.get("/:addressId",verifyJWT,getAddress)

export default router;