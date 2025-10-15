import asyncHandler from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";

import mongoose from "mongoose";


const createComment = asyncHandler(async(req, res) => {
    const { text, parentComment, postId } = req.body;
    
    if(!text) {
        return res.status(400).json({
            success: false,
            message: "Text is required"
        });
    }
    
    // Use parentComment if provided (for replies), otherwise null
    const parentId = parentComment || req.params.commentId || null;
    
    if(parentId) {
        const parentCommentDoc = await Comment.findById(parentId);
        if(!parentCommentDoc) {
            return res.status(404).json({
                success: false,
                message: "Parent comment not found"
            });
        }
    }
    
    const comment = await Comment.create({
        text,
        userId: req.user._id,
        parentId: parentId,
        postId: postId || 'default-post'
    });
    
    const populatedComment = await Comment.findById(comment._id)
        .populate("userId", "-password -refreshToken")
        .lean();
    
    // Format response for frontend
    const formattedComment = {
        ...populatedComment,
        author: {
            _id: populatedComment.userId?._id,
            name: populatedComment.userId?.username || populatedComment.userId?.email,
            email: populatedComment.userId?.email,
            avatar: populatedComment.userId?.avatar
        },
        replies: []
    };
    delete formattedComment.userId;
    
    res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: formattedComment
    });
});

const getComments = asyncHandler(async(req, res) => {
    const { postId } = req.params;
    const { sort } = req.query;
    const currentUserId = req.user?._id; // Optional user from optionalAuth middleware
    
    // Fetch all top-level comments (no parent) for the post
    let comments = await Comment.find({ parentId: null })
        .sort({ createdAt: -1 })
        .populate("userId", "-password -refreshToken")
        .lean();
    
    // Recursive function to fetch nested replies
    const fetchReplies = async (commentId) => {
        const replies = await Comment.find({ parentId: commentId })
            .sort({ createdAt: -1 })
            .populate("userId", "-password -refreshToken")
            .lean();
        
        for (let reply of replies) {
            reply.replies = await fetchReplies(reply._id);
            // Format author data for frontend
            reply.author = {
                _id: reply.userId?._id,
                name: reply.userId?.name || reply.userId?.email,
                email: reply.userId?.email,
                avatar: reply.userId?.avatar
            };
            // Check if current user has upvoted this reply (safely handle undefined upvotedBy)
            reply.isUpvoted = currentUserId && reply.upvotedBy?.length > 0
                ? reply.upvotedBy.some(id => id.equals(currentUserId))
                : false;
            delete reply.userId;
            delete reply.upvotedBy; // Don't send the full list to frontend
        }
        return replies;
    };
    
    // Fetch replies for each comment
    for (let comment of comments) {
        comment.replies = await fetchReplies(comment._id);
        // Format author data for frontend
        comment.author = {
            _id: comment.userId?._id,
            name: comment.userId?.name || comment.userId?.email,
            email: comment.userId?.email,
            avatar: comment.userId?.avatar
        };
        // Check if current user has upvoted this comment (safely handle undefined upvotedBy)
        comment.isUpvoted = currentUserId && comment.upvotedBy?.length > 0
            ? comment.upvotedBy.some(id => id.equals(currentUserId))
            : false;
        delete comment.userId;
        delete comment.upvotedBy; // Don't send the full list to frontend
    }
    
    // Sort based on query parameter
    if (sort === 'upvotes') {
        comments.sort((a, b) => b.upvotes - a.upvotes);
    } else {
        // Default: newest first (already sorted by createdAt)
    }
    
    res.status(200).json({
        success: true,
        data: comments
    });
});

const upvoteComment = asyncHandler(async(req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id; // Get user ID from auth middleware
    
    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid comment id"
        });
    }
    
    const comment = await Comment.findById(commentId);
    if(!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        });
    }
    
    // Initialize upvotedBy array if it doesn't exist (for old comments)
    if (!comment.upvotedBy) {
        comment.upvotedBy = [];
    }
    
    // Check if user already upvoted
    const hasUpvoted = comment.upvotedBy.some(id => id.equals(userId));
    
    if (hasUpvoted) {
        // Remove upvote
        comment.upvotedBy = comment.upvotedBy.filter(id => !id.equals(userId));
        comment.upvotes = Math.max(0, comment.upvotes - 1); // Ensure upvotes don't go negative
        await comment.save();
        
        return res.status(200).json({
            success: true,
            message: "Upvote removed successfully",
            data: {
                _id: comment._id,
                upvotes: comment.upvotes,
                isUpvoted: false
            }
        });
    } else {
        // Add upvote
        comment.upvotedBy.push(userId);
        comment.upvotes += 1;
        await comment.save();
        
        return res.status(200).json({
            success: true,
            message: "Comment upvoted successfully",
            data: {
                _id: comment._id,
                upvotes: comment.upvotes,
                isUpvoted: true
            }
        });
    }
});





export{
    createComment,
    getComments,
    upvoteComment

}