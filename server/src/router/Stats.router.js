import { Router } from "express";
import { getHomeStats } from "../controllers/Stats.controller.js";

const router = Router();

router.get("/", getHomeStats);

export default router;
