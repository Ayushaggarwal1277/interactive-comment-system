import React from 'react';
import { IconButton, Typography, Box, Tooltip } from '@mui/material';
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material';

/**
 * UpvoteButton Component
 * Displays upvote button with count and handles upvote action
 * @param {number} upvotes - Current upvote count
 * @param {boolean} isUpvoted - Whether current user has upvoted
 * @param {function} onUpvote - Callback when upvote is clicked
 * @param {boolean} disabled - Disable button (e.g., when not logged in)
 */
const UpvoteButton = ({ upvotes = 0, isUpvoted = false, onUpvote, disabled = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Tooltip title={disabled ? 'Login to upvote' : 'Upvote'}>
        <span>
          <IconButton
            size="small"
            onClick={onUpvote}
            disabled={disabled}
            sx={{
              color: isUpvoted ? 'primary.main' : 'text.secondary',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.main',
              },
            }}
          >
            {isUpvoted ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
          </IconButton>
        </span>
      </Tooltip>
      <Typography
        variant="body2"
        fontWeight={isUpvoted ? 'bold' : 'normal'}
        color={isUpvoted ? 'primary.main' : 'text.secondary'}
      >
        {upvotes}
      </Typography>
    </Box>
  );
};

export default UpvoteButton;
