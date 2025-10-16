import asynchandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateAccessandRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating refresh and access token");
    }
};


const registerUser = asynchandler(async(req, res) => {
    const { email, password, name, googleId } = req.body;
    let avatar = req.body.avatar;

    console.log("=== REGISTRATION DEBUG ===");
    console.log("Body:", { name, email, googleId });
    console.log("req.file:", req.file);
    console.log("req.body.avatar:", req.body.avatar);

    // Validate required fields
    if(!name || (!email && !googleId) || (!password && !googleId))
    {
        return res.status(400).json({
            success: false,
            message: "Name, email, and password are required"
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne(googleId ? { googleId } : { email });
    if(existingUser)
    {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    // Handle avatar upload (REQUIRED)
    if (req.file) {
        // Avatar uploaded via multer
        const avatarLocalPath = req.file.path;
        console.log("Uploading file from path:", avatarLocalPath);
        
        try {
            const uploadedImage = await uploadOnCloudinary(avatarLocalPath);
            console.log("Cloudinary upload result:", uploadedImage);
            
            if(uploadedImage && uploadedImage.secure_url) {
                avatar = uploadedImage.secure_url;
                console.log("Avatar URL set to:", avatar);
            } else {
                console.error("Cloudinary upload succeeded but no secure_url returned");
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed - no URL returned"
                });
            }
        } catch (error) {
            console.error("Avatar upload error:", error);
            return res.status(500).json({
                success: false,
                message: "Image upload failed: " + error.message
            });
        }
    } else if (avatar && typeof avatar === 'string' && avatar.startsWith('http')) {
        // Avatar URL provided directly (for Google OAuth) - keep as is
        console.log("Using provided avatar URL:", avatar);
    } else {
        // No avatar provided - return error since it's required
        console.error("No avatar file or URL provided");
        return res.status(400).json({
            success: false,
            message: "Avatar is required. Please upload a profile picture."
        });
    }

    console.log("Creating user with avatar:", avatar);

    const user = await User.create({
        email,
        password,
        name,
        avatar,
        googleId
    });
    

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser)
    {
        return res.status(500).json({
            success: false,
            message: "User creation failed"
        });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshTokens(createdUser._id);

    const options = {
        httpOnly: true,
        secure: true, // must be true on https (Vercel)
        sameSite: "none", // important for cross-domain requests
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "User registered successfully",
            data: {
                user: createdUser,
                accessToken,
                refreshToken
            }
        });

});

const loginUser = asynchandler(async(req, res) => {
    const { email, password,googleId } = req.body;
    if((!email && !googleId) || (!password && !googleId))
    {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const user = await User.findOne(googleId ? { googleId } : { email });
    if(!user)
    {   
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        });
    }
    if(!googleId)
    {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        message: "User logged in successfully",
        data: {
            user: loggedInUser,
            accessToken,
            refreshToken
        }
    })
});

const refreshToken = asynchandler(async(req, res) => {
    const token = req.cookies.refreshToken;
    if(!token)
    {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if(!user || user.refreshToken !== token)
        {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessandRefreshTokens(user._id);
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json({
            success: true,
            message: "Token refreshed successfully",
            data: {
                accessToken,
                refreshToken: newRefreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const googleLoginUser = asynchandler(async(req, res) => {
    const { credential } = req.body;
    
    console.log("=== GOOGLE LOGIN DEBUG ===");
    console.log("Received credential:", credential ? "Present" : "Missing");
    
    if (!credential) {
        return res.status(400).json({
            success: false,
            message: "Google credential is required"
        });
    }

    try {
        console.log("Verifying Google token with Client ID:", process.env.GOOGLE_CLIENT_ID);
        
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;
        
        console.log("Google user data:", { googleId, email, name, hasPicture: !!picture });

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            console.log("Creating new user from Google data");
            // Create new user with Google data
            user = await User.create({
                email,
                name,
                googleId,
                avatar: picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                password: Math.random().toString(36).slice(-8), // Random password for Google users
            });
            console.log("New user created:", user._id);
        } else if (!user.googleId) {
            console.log("Linking Google account to existing user");
            // Link Google account to existing user
            user.googleId = googleId;
            if (picture && !user.avatar) {
                user.avatar = picture;
            }
            await user.save();
        } else {
            console.log("Existing Google user found:", user._id);
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessandRefreshTokens(user._id);
        console.log("Tokens generated successfully");

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                message: "Google login successful",
                data: {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                }
            });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid Google credentials"
        });
    }
});

export{
    registerUser,
    loginUser,
    refreshToken,
    googleLoginUser
}


   
