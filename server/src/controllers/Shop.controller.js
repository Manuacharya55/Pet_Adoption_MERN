import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import User from "../models/User.Model.js";
import Shop from "../models/Shop.Model.js";
import Pet from "../models/Pets.Model.js";

export const addShop = AsyncHandler(async (req, res) => {
  const { image, shopname } = req.body;
  const { _id } = req.user;

  console.log(image, shopname);
  if (!image || !shopname) {
    throw new ApiError(401, "Required fields are empty");
  }

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "No such user");
  }

  const existingShop = await Shop.findOne({ user: _id });
  if (existingShop) {
    throw new ApiError(400, "shop already exists");
  }

  const shop = await Shop.create({
    image,
    shopname,
    user: existingUser._id,
    address: existingUser.address,
  });

  existingUser.shop = shop._id;
  existingUser.role = "shopkeeper";

  await existingUser.save();

  const token = await existingUser.generateToken();
  const data = {
    image: shop.image,
    shopname: shop.shopname,
    token: token,
    address: existingUser.address,
  };

  res.status(201).json(new ApiSuccess(201, data, "Shop create successfully"));
});

export const getShops = AsyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const shops = await Shop.find()
    .select("shopname image")
    .skip(skip)
    .limit(limit);
  const count = await Shop.countDocuments();

  const data = {
    shops,
    count: count,
    remainingShops: Math.max(count - page * limit, 0),
  };

  res.status(200).json(new ApiSuccess(200, data, "Shops fetched successfully"));
});

export const getSingleShop = AsyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const shop = await Shop.findById(shopId).select("-createdAt -updatedAt -pet").populate([
    {
      path: "address",
      select : "phonenumber lat lng"
    },
    { path: "user", select: "email" },
  ]);
  if (!shop) {
    throw new ApiError(400, "No such shop");
  }

  const count = await Pet.countDocuments({ isAdopted: false, shop: shopId });
  const pets = await Pet.find({ isAdopted: false }).populate("category").limit(limit).skip(skip);

  const data = {
    shop: shop,
    pets: pets,
    count: count,
    remainingPets: Math.max(count - page * limit, 0),
  };

  res
    .status(200)
    .json(new ApiSuccess(200, data, "shop details fetched successfully"));
});
