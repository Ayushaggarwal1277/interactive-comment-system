import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { CommentOutlined } from '@mui/icons-material';

/**
 * EmptyState Component
 * Displays when no comments exist
 * @param {string} message - Message to display
 */
const EmptyState = ({ message = 'Be the first to comment' }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: 'grey.50',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CommentOutlined sx={{ fontSize: 64, color: 'grey.400' }} />
        <Typography variant="h6" color="text.secondary">
          {message}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Share your thoughts below
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmptyState;
