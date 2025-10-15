import React from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import UserAvatar from '../common/UserAvatar';

/**
 * Post Component
 * Displays a single post with image, title, author, and timestamp
 * @param {Object} post - Post data object
 */
const Post = ({ post }) => {
  // Format timestamp to relative time
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Default post data if not provided
  const defaultPost = {
    title: 'Welcome to Our Comment Section',
    content: 'This is a demonstration of our interactive comment section. Feel free to share your thoughts, reply to others, and upvote interesting comments!',
    author: {
      name: 'Admin',
      avatar: null,
    },
    imageUrl: null,
    createdAt: new Date().toISOString(),
    tags: ['Discussion', 'Community'],
  };

  const postData = post || defaultPost;

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 4,
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Post Image */}
      {postData.imageUrl && (
        <Box
          component="img"
          src={postData.imageUrl}
          alt={postData.title}
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
          }}
        />
      )}

      {/* Post Content */}
      <Box sx={{ p: 3 }}>
        {/* Tags */}
        {postData.tags && postData.tags.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {postData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        )}

        {/* Post Title */}
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {postData.title}
        </Typography>

        {/* Post Content/Description */}
        {postData.content && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.7 }}
          >
            {postData.content}
          </Typography>
        )}

        {/* Author and Timestamp */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          {/* Author Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <UserAvatar user={postData.author} size="medium" />
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {postData.author?.name || 'Anonymous'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatTimestamp(postData.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Additional Info */}
          {postData.category && (
            <Chip
              icon={<Person />}
              label={postData.category}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Post;
