import jwt from "jsonwebtoken";
import { ApiError } from "../utils/AppError.js";
import User from "../models/User.Model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const verifyJWT = AsyncHandler(async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    throw new ApiError(401, "No token provided");
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    throw new ApiError(401, "Not Authorised");
  }

  const user = await User.findById(decoded?._id).select("-password");

  if (!user) {
    throw new ApiError(400, "Not Authorised");
  }

  req.user = user;
  next();
});
