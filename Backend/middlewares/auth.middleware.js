import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if(!user)
    {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    req.user = user;
    next();
    
});

// Optional auth - doesn't require login but attaches user if token exists
export const optionalAuth = asyncHandler(async(req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        req.user = user || null;
    } catch (error) {
        req.user = null;
    }
    
    next();
});