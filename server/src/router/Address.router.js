import express from "express"
import { addAddress, updateAddress } from "../controllers/Address.controller.js";
import { verifyJWT } from "../middleware/Auth.middleware.js";


const router = express.Router();

router.post("/",verifyJWT,addAddress);
router.patch("/:addressId",verifyJWT,updateAddress)

export default router;