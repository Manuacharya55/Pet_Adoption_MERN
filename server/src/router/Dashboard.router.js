import express from "express"
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { adminDashBoard, shopkeeperDashBoard, } from "../controllers/Dashboard.controller.js";

const router = express.Router();

router.get("/admin",adminDashBoard);
router.get("/shopkeeper",verifyJWT,shopkeeperDashBoard);


export default router;