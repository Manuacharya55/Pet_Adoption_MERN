import Pet from "../models/Pets.Model.js";
import Shop from "../models/Shop.Model.js";
import User from "../models/User.Model.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getAllUsers = AsyncHandler(async(req,res)=>{
    const page = Number(req.query.page) || 1
    const limit = 10;
    const skip = (page - 1) * 10;

    const count = await User.countDocuments();
    const users = await User.find().populate("address").skip(skip).limit(limit)

    const data = {
        count : count,
        users : users,
        currentPage : page,
        totalPages : Math.ceil(count/limit)
    }

    res.status(200).json(new ApiSuccess(200,data,"All Users fetched Successfully"))
})

export const getAllShops = AsyncHandler(async(req,res)=>{
    const page = Number(req.query.page) || 1
    const limit = 10;
    const skip = (page - 1) * 10;

    const count = await Shop.countDocuments();
    const shops = await Shop.find().populate("address").skip(skip).limit(limit)

    const data = {
        count : count,
        shops : shops,
        currentPage : page,
        totalPages : Math.ceil(count/limit)
    }

    res.status(200).json(new ApiSuccess(200,data,"All Shops fetched Successfully"))
})

export const getAllPets = AsyncHandler(async(req,res)=>{
    const page = Number(req.query.page) || 1
    const limit = 10;
    const skip = (page - 1) * 10;

    const count = await Pet.countDocuments();
    const pets = await Pet.find().populate("category").skip(skip).limit(limit)

    const data = {
        count : count,
        pets : pets,
        currentPage : page,
        totalPages : Math.ceil(count/limit)
    }

    res.status(200).json(new ApiSuccess(200,data,"All Pets fetched Successfully"))
})