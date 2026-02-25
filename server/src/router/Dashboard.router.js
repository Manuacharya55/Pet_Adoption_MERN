import express from "express"
import { verifyJWT, verifyAdmin, verifyShopkeeper } from "../middleware/Auth.middleware.js";
import { adminDashBoard, shopkeeperDashBoard, } from "../controllers/Dashboard.controller.js";

const router = express.Router();

router.get("/admin", verifyJWT, verifyAdmin, adminDashBoard);
router.get("/shopkeeper", verifyJWT, verifyShopkeeper, shopkeeperDashBoard);


export default router;