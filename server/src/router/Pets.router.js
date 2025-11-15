import express from "express"
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { addPet, deletePet, getMyPet, getPet, getSinglePet, updatePet } from "../controllers/Pets.Controller.js";


const router = express.Router();

router.get("/",verifyJWT,getPet);
router.post("/",verifyJWT,addPet);
router.get("/mypets",verifyJWT,getMyPet);

router.get("/:petId",verifyJWT,getSinglePet)
router.patch("/:petId",verifyJWT,updatePet)
router.delete("/:petId",verifyJWT,deletePet)

export default router;