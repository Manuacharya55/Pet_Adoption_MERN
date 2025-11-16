import Adoption from "../models/Adoption.Model.js";
import Category from "../models/Category.Model.js";
import Pets from "../models/Pets.Model.js";
import Shops from "../models/Shop.Model.js";
import User from "../models/User.Model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import { ApiError } from "../utils/AppError.js";
import Shop from "../models/Shop.Model.js";

export const adminDashBoard = AsyncHandler(async (req, res) => {
  const [
    userCount,
    shopsCount,
    petsCount,
    categoryCount,
    approvedCount,
    pendingCount,
    lastestUsers,
    latestPets,
    latestShops,
  ] = await Promise.all([
    User.countDocuments(),
    Shops.countDocuments(),
    Pets.countDocuments(),
    Category.countDocuments(),
    Adoption.countDocuments({ status: "approved" }),
    Adoption.countDocuments({ status: "pending" }),
    User.find().sort({ createdAt: -1 }).limit(5).select("image fullname role"),
    Pets.find().sort({ createdAt: -1 }).limit(5).select("image name price"),
    Shops.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("image shopname createdAt"),
  ]);

  const data = {
    userList: lastestUsers,
    shopList: latestShops,
    petList: latestPets,
    count: [
      {
        name: "total users",
        count: userCount,
      },
      {
        name: "total shops",
        count: shopsCount,
      },
      {
        name: "total pets",
        count: petsCount,
      },
      {
        name: "total categories",
        count: categoryCount,
      },
      {
        name: "pending requests",
        count: pendingCount,
      },
      {
        name: "total approvals",
        count: approvedCount,
      },
    ],
  };

  res
    .status(200)
    .json(new ApiSuccess(200, data, "Dashboard fetched successfully"));
});

export const shopkeeperDashBoard = AsyncHandler(async (req, res) => {
  const { shop } = req.user;

  const existingShop = await Shop.findById(shop);

  if (!existingShop) {
    throw new ApiError(401, "No such shop");
  }

  const [totalPets, activePets, approvedRequest, rejectedRequest,malePets,femalePets] = await Promise.all([
    await Pets.countDocuments({ shop: shop }),
    await Pets.countDocuments({ isAdopted: false, shop: shop }),
    await Adoption.countDocuments({ status: "approved", shop: shop }),
    await Adoption.countDocuments({ status: "rejected", shop: shop }),
    await Pets.countDocuments({ isAdopted: false, shop: shop,gender:"male"}),
    await Pets.countDocuments({ isAdopted: false, shop: shop,gender:"female"}),
  ]);

  const data = {
    count: [
      {
        name: "total pets",
        count: totalPets,
      },
      {
        name: "total active pets",
        count: activePets,
      },
      {
        name: "total approved requests",
        count: approvedRequest,
      },
      {
        name: "total rejected requests",
        count: rejectedRequest,
      },
      {
        name: "total female pets",
        count: malePets,
      },
      {
        name: "total male pets",
        count: femalePets,
      }
    ],
  };
  res
    .status(200)
    .json(new ApiSuccess(200, data, "Dashboard fetched successfully"));
});
