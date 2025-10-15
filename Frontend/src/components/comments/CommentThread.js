import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import { Sort } from '@mui/icons-material';
import Comment from './Comment';
import CommentForm from './CommentForm';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useComments } from '../../context/CommentsContext';
import { useAuth } from '../../context/AuthContext';

/**
 * CommentThread Component
 * Main component that displays all comments with sorting and add functionality
 * @param {string} postId - ID of the post to fetch comments for
 */
const CommentThread = ({ postId = 'default-post' }) => {
  const { isAuthenticated } = useAuth();
  const {
    comments,
    loading,
    error,
    sortBy,
    fetchComments,
    addComment,
    changeSortOrder,
  } = useComments();

  // Fetch comments on mount and when sortBy changes
  useEffect(() => {
    fetchComments(postId);
  }, [postId, sortBy, fetchComments]);

  // Handle new comment submission
  const handleCommentSubmit = async (text) => {
    await addComment({
      text,
      postId,
    });
  };

  // Handle sort change
  const handleSortChange = (event) => {
    changeSortOrder(event.target.value);
  };

  // Sort comments based on selected criteria
  const getSortedComments = () => {
    if (!comments || comments.length === 0) return [];
    
    const sorted = [...comments];
    
    if (sortBy === 'upvotes') {
      return sorted.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else {
      // Default: newest first
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const sortedComments = getSortedComments();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', px: 2 }}>
      {/* Comments Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'grey.50',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            Comments
          </Typography>
          {!loading && (
            <Typography variant="h6" color="text.secondary">
              ({comments.length})
            </Typography>
          )}
        </Box>

        {/* Sort Dropdown */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortBy}
            label="Sort by"
            onChange={handleSortChange}
            startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="upvotes">Most Upvoted</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Error Message */}
      {error && (
        <ErrorMessage 
          message={error} 
          title="Error Loading Comments"
        />
      )}

      {/* Add Comment Form */}
      <CommentForm
        onSubmit={handleCommentSubmit}
        disabled={!isAuthenticated}
        placeholder={
          isAuthenticated
            ? 'Share your thoughts...'
            : 'Login to join the conversation'
        }
      />

      <Divider sx={{ mb: 3 }} />

      {/* Loading State */}
      {loading && comments.length === 0 && <LoadingSpinner />}

      {/* Empty State */}
      {!loading && comments.length === 0 && (
        <EmptyState message="Be the first to comment" />
      )}

      {/* Comments List */}
      {sortedComments.length > 0 && (
        <Box>
          {sortedComments.map((comment) => (
            <Comment key={comment._id} comment={comment} depth={0} />
          ))}
        </Box>
      )}

      {/* Info Message for Non-Authenticated Users */}
      {!isAuthenticated && comments.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 3,
            textAlign: 'center',
            backgroundColor: 'info.light',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="info.dark">
            Login to join the conversation and interact with comments
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CommentThread;
