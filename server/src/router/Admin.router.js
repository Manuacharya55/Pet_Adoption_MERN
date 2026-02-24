import express from "express"
import { getAllPets, getAllShops, getAllUsers } from "../controllers/Admin.Controller.js";
import { verifyAdmin, verifyJWT } from "../middleware/Auth.middleware.js";


const router = express.Router();

router.get("/users",verifyJWT,verifyAdmin,getAllUsers);
router.get("/shops",verifyJWT,verifyAdmin,getAllShops);
router.get("/pets",verifyJWT,verifyAdmin,getAllPets);


export default router;