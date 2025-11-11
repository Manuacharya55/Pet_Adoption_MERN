import User from '../models/User.Model.js';
import { ApiError } from '../utils/AppError.js';
import { verifyToken } from '../utils/GenerateToken.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';

export const verifyUser = AsyncHandler(async (req, res, next) => {
    // Get token from header
    const token = req.headers.token;
    console.log(token)
    if (!token) {
       throw new ApiError(401, 'No token provided');
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
        throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();

});

export const verifyAdmin = AsyncHandler(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new ApiError(403, 'Unauthorized');
    }
    next();
});

export const verifyShopkeeper = AsyncHandler(async (req, res, next) => {
    if (req.user.role !== 'shopkeeper') {
        throw new ApiError(403, 'Unauthorized');
    }
    next();
});