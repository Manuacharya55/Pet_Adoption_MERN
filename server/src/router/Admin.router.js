import express from "express"
import { getAllPets, getAllShops, getAllUsers } from "../controllers/Admin.Controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/Auth.middleware.js";


const router = express.Router();

router.use(verifyJWT, verifyAdmin);

router.get("/users", getAllUsers);
router.get("/shops", getAllShops);
router.get("/pets", getAllPets);


export default router;