import express from "express";
import { verifyJWT } from "../middleware/Auth.middleware.js";
import {
  addAdoption,
  getActiveAdoptionRequest,
  getAdoptionRequestHistory,
  getSingleAdoptionRequest,
  updateRequests,
} from "../controllers/Adoption.controller.js";

const router = express.Router();

router
  .route("/")
  .get(verifyJWT, getActiveAdoptionRequest)
  .post(verifyJWT, addAdoption);

router.get("/history", verifyJWT, getAdoptionRequestHistory);
router.route("/:petId").get(verifyJWT,getSingleAdoptionRequest).patch(verifyJWT, updateRequests);

export default router;
