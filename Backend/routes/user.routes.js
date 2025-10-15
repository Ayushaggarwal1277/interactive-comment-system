import { Router } from "express";
import { registerUser, loginUser, refreshToken, googleLoginUser} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

// Register - POST /api/users/register (no auth required)
userRouter.route("/register").post(upload.single("avatar"), registerUser);

// Login - POST /api/users/login
userRouter.route("/login").post(loginUser);

// Logout - POST /api/users/logout
userRouter.route("/logout").post(verifyJWT, (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Get current user - GET /api/users/current
userRouter.route("/current").get(verifyJWT, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

// Refresh token - GET /api/users/refresh-token
userRouter.route("/refresh-token").get(verifyJWT, refreshToken);

// Google OAuth login - POST /api/users/google-login
userRouter.route("/google-login").post(googleLoginUser);

export default userRouter;
