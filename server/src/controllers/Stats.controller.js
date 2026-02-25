import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import Pets from "../models/Pets.Model.js";
import Shop from "../models/Shop.Model.js";
import Adoption from "../models/Adoption.Model.js";
import User from "../models/User.Model.js";

export const getHomeStats = AsyncHandler(async (req, res) => {
    const [petsCount, shopsCount, adoptionCount, userCount] = await Promise.all([
        Pets.countDocuments({ isAdopted: false, isActive: true }),
        Shop.countDocuments(),
        Adoption.countDocuments({ status: "approved" }),
        User.countDocuments(),
    ]);

    const stats = [
        { name: "Pets Available", count: petsCount },
        { name: "Partner Shops", count: shopsCount },
        { name: "Successful Adoptions", count: adoptionCount },
        { name: "Happy Families", count: userCount },
    ];

    res.status(200).json(new ApiSuccess(200, stats, "Home stats fetched successfully"));
});
