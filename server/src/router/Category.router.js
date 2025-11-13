import express from "express"
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { addCategory, getCategories, updateCategory } from "../controllers/Category.Controller.js";


const router = express.Router();

router.get("/",verifyJWT,getCategories);
router.post("/",verifyJWT,addCategory);
router.patch("/:categoryId",verifyJWT,updateCategory)

export default router;