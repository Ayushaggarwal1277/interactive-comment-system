import { Router } from "express";
import { createComment,getComments,upvoteComment } from "../controllers/comment.controllers.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";


const commentRouter = Router();

// Create a new comment - POST /api/comments
commentRouter.route("/").post(verifyJWT, createComment);

// Get comments for a post - GET /api/comments/:postId (optional auth to show upvote status)
commentRouter.route("/:postId").get(optionalAuth, getComments);

// Upvote a comment - POST /api/comments/:commentId/upvote
commentRouter.route("/:commentId/upvote").post(verifyJWT, upvoteComment);

// Reply to a comment - POST /api/comments/:commentId/reply
commentRouter.route("/:commentId/reply").post(verifyJWT, createComment);

export default commentRouter;
