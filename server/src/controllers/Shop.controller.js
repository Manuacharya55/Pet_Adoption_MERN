import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { ApiSuccess } from "../utils/AppSuccess.js";
import User from "../models/User.Model.js";
import Shop from "../models/Shop.Model.js";

export const addShop = AsyncHandler(async (req, res) => {
  const { image, shopname } = req.body;
  const { _id } = req.user;

  console.log(image,shopname)
  if (!image || !shopname) {
    throw new ApiError(401, "Required fields are empty");
  }

  const existingUser = await User.findById(_id);
  
  if (!existingUser) {
    throw new ApiError(400, "No such user");
  }
  
  const existingShop = await Shop.findOne({user : _id})
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
    address : existingUser.address
  };

  res.status(201).json(new ApiSuccess(201, data, "Shop create successfully"));
});
