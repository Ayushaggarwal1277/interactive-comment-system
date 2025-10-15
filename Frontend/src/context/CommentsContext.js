import React, { createContext, useState, useContext, useCallback } from 'react';
import { commentsAPI } from '../services/apiService';

// Create Comments Context
const CommentsContext = createContext(null);

// Custom hook to use comments context
export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};

// Comments Provider Component
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'upvotes'

  // Fetch all comments for a post
  const fetchComments = useCallback(async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentsAPI.getComments(postId, sortBy);
      setComments(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch comments');
      console.error('Fetch comments error:', err);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  // Add a new top-level comment (optimistic update)
  const addComment = async (commentData) => {
    try {
      // Optimistic update - add temporary comment
      const tempComment = {
        _id: `temp-${Date.now()}`,
        ...commentData,
        upvotes: 0,
        replies: [],
        createdAt: new Date().toISOString(),
        isTemp: true,
      };
      setComments(prev => [tempComment, ...prev]);

      // API call
      const response = await commentsAPI.createComment(commentData);
      
      // Replace temporary comment with real one
      setComments(prev => 
        prev.map(c => c._id === tempComment._id ? response.data : c)
      );
      
      return { success: true, data: response.data };
    } catch (err) {
      // Remove temporary comment on error
      setComments(prev => prev.filter(c => !c.isTemp));
      setError(err.message || 'Failed to add comment');
      return { success: false, error: err.message };
    }
  };

  // Add a reply to a comment (optimistic update)
  const addReply = async (parentCommentId, replyData) => {
    try {
      // Optimistic update - add temporary reply
      const tempReply = {
        _id: `temp-${Date.now()}`,
        ...replyData,
        upvotes: 0,
        replies: [],
        createdAt: new Date().toISOString(),
        isTemp: true,
      };

      // Recursive function to find and update parent comment
      const updateReplies = (commentsList) => {
        return commentsList.map(comment => {
          if (comment._id === parentCommentId) {
            return {
              ...comment,
              replies: [tempReply, ...(comment.replies || [])],
            };
          } else if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateReplies(comment.replies),
            };
          }
          return comment;
        });
      };

      setComments(prev => updateReplies(prev));

      // API call
      const response = await commentsAPI.replyToComment(parentCommentId, replyData);
      
      // Replace temporary reply with real one
      const replaceTemp = (commentsList) => {
        return commentsList.map(comment => {
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: comment.replies.map(reply => 
                reply._id === tempReply._id ? response.data : reply
              ).map(r => replaceTemp([r])[0]),
            };
          }
          return comment;
        });
      };

      setComments(prev => replaceTemp(prev));
      
      return { success: true, data: response.data };
    } catch (err) {
      // Remove temporary reply on error
      const removeTemp = (commentsList) => {
        return commentsList.map(comment => ({
          ...comment,
          replies: comment.replies?.filter(r => !r.isTemp).map(r => removeTemp([r])[0]) || [],
        }));
      };
      setComments(prev => removeTemp(prev));
      
      setError(err.message || 'Failed to add reply');
      return { success: false, error: err.message };
    }
  };

  // Upvote a comment (optimistic update with toggle)
  const upvoteComment = async (commentId) => {
    try {
      // Optimistic update - toggle upvote
      const toggleUpvote = (commentsList) => {
        return commentsList.map(comment => {
          if (comment._id === commentId) {
            const isCurrentlyUpvoted = comment.isUpvoted || false;
            return { 
              ...comment, 
              upvotes: isCurrentlyUpvoted 
                ? Math.max(0, (comment.upvotes || 0) - 1)
                : (comment.upvotes || 0) + 1,
              isUpvoted: !isCurrentlyUpvoted
            };
          } else if (comment.replies && comment.replies.length > 0) {
            return { ...comment, replies: toggleUpvote(comment.replies) };
          }
          return comment;
        });
      };

      setComments(prev => toggleUpvote(prev));

      // API call
      const response = await commentsAPI.upvoteComment(commentId);
      
      // Update with actual values from server
      const updateWithServerData = (commentsList) => {
        return commentsList.map(comment => {
          if (comment._id === commentId) {
            return { 
              ...comment, 
              upvotes: response.data.upvotes,
              isUpvoted: response.data.isUpvoted
            };
          } else if (comment.replies && comment.replies.length > 0) {
            return { ...comment, replies: updateWithServerData(comment.replies) };
          }
          return comment;
        });
      };
      
      setComments(prev => updateWithServerData(prev));
      
      return { success: true };
    } catch (err) {
      // Revert optimistic update on error
      const revertUpvote = (commentsList) => {
        return commentsList.map(comment => {
          if (comment._id === commentId) {
            const isCurrentlyUpvoted = comment.isUpvoted || false;
            return { 
              ...comment, 
              upvotes: isCurrentlyUpvoted 
                ? (comment.upvotes || 0) + 1
                : Math.max(0, (comment.upvotes || 0) - 1),
              isUpvoted: !isCurrentlyUpvoted
            };
          } else if (comment.replies && comment.replies.length > 0) {
            return { ...comment, replies: revertUpvote(comment.replies) };
          }
          return comment;
        });
      };
      setComments(prev => revertUpvote(prev));
      
      setError(err.message || 'Failed to upvote comment');
      return { success: false, error: err.message };
    }
  };

  // Sort comments
  const changeSortOrder = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const value = {
    comments,
    loading,
    error,
    sortBy,
    fetchComments,
    addComment,
    addReply,
    upvoteComment,
    changeSortOrder,
  };

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
};

export default CommentsContext;
