import React from 'react';
import { CircularProgress, Box } from '@mui/material';

/**
 * LoadingSpinner Component
 * Displays a centered loading spinner
 * @param {string} size - Size of spinner: 'small', 'medium', 'large'
 * @param {boolean} fullScreen - If true, takes full screen height
 */
const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullScreen ? '100vh' : '200px',
        width: '100%',
      }}
    >
      <CircularProgress size={sizeMap[size] || sizeMap.medium} />
    </Box>
  );
};

export default LoadingSpinner;
