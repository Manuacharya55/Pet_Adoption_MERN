import express from "express"
import { getAllPets, getAllShops, getAllUsers } from "../controllers/Admin.Controller.js";


const router = express.Router();

router.get("/users",getAllUsers);
router.get("/shops",getAllShops);
router.get("/pets",getAllPets);


export default router;