import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Reply as ReplyIcon,
  ExpandMore,
  ExpandLess,
  AccessTime,
} from '@mui/icons-material';
import UserAvatar from '../common/UserAvatar';
import UpvoteButton from './UpvoteButton';
import ReplyInput from './ReplyInput';
import { useAuth } from '../../context/AuthContext';
import { useComments } from '../../context/CommentsContext';

/**
 * Comment Component
 * Displays a single comment with nested replies
 * Supports collapsible threads and inline reply functionality
 * @param {Object} comment - Comment data object
 * @param {number} depth - Current nesting depth (for indentation)
 */
const Comment = ({ comment, depth = 0 }) => {
  const { isAuthenticated } = useAuth();
  const { addReply, upvoteComment } = useComments();
  
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUpvoting, setIsUpvoting] = useState(false);

  // Maximum depth for visual indentation (after this, use same indentation)
  const MAX_VISUAL_DEPTH = 8;
  const visualDepth = Math.min(depth, MAX_VISUAL_DEPTH);
  
  // Calculate left padding based on depth
  const leftPadding = visualDepth * 16; // 16px per level

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (text) => {
    const result = await addReply(comment._id, {
      text,
      postId: comment.postId,
      parentComment: comment._id,
    });

    if (result.success) {
      setShowReplyInput(false);
      setIsExpanded(true); // Expand to show new reply
    }
  };

  // Handle upvote
  const handleUpvote = async () => {
    if (!isAuthenticated || isUpvoting) return;
    
    setIsUpvoting(true);
    await upvoteComment(comment._id);
    setIsUpvoting(false);
  };

  // Toggle expand/collapse
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <Box
      sx={{
        pl: `${leftPadding}px`,
        mb: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: depth % 2 === 0 ? 'white' : 'grey.50',
          borderLeft: depth > 0 ? 2 : 0,
          borderColor: 'primary.light',
          borderRadius: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: depth % 2 === 0 ? 'grey.50' : 'grey.100',
          },
        }}
      >
        {/* Comment Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
          <UserAvatar user={comment.author} size="small" />
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" fontWeight="bold">
                {comment.author?.name || 'Anonymous'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime sx={{ fontSize: 12, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatTimestamp(comment.createdAt)}
                </Typography>
              </Box>
              {comment.isTemp && (
                <Typography variant="caption" color="warning.main">
                  Posting...
                </Typography>
              )}
            </Box>
          </Box>

          {/* Collapse/Expand button for comments with replies */}
          {hasReplies && (
            <Tooltip title={isExpanded ? 'Collapse' : 'Expand'}>
              <IconButton size="small" onClick={toggleExpanded}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Comment Text */}
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {comment.text}
        </Typography>

        {/* Comment Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <UpvoteButton
            upvotes={comment.upvotes || 0}
            isUpvoted={comment.isUpvoted}
            onUpvote={handleUpvote}
            disabled={!isAuthenticated || isUpvoting}
          />
          
          <Button
            size="small"
            startIcon={<ReplyIcon />}
            onClick={() => setShowReplyInput(!showReplyInput)}
            disabled={!isAuthenticated}
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.main',
              },
            }}
          >
            Reply
          </Button>

          {hasReplies && (
            <Typography variant="caption" color="text.secondary">
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </Typography>
          )}
        </Box>

        {/* Reply Input (shown inline) */}
        {showReplyInput && (
          <ReplyInput
            onSubmit={handleReplySubmit}
            onCancel={() => setShowReplyInput(false)}
            placeholder={`Reply to ${comment.author?.name || 'this comment'}...`}
          />
        )}
      </Paper>

      {/* Nested Replies with smooth collapse animation */}
      {hasReplies && (
        <Collapse in={isExpanded} timeout="auto">
          <Box sx={{ mt: 1 }}>
            {comment.replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                depth={depth + 1}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default Comment;
