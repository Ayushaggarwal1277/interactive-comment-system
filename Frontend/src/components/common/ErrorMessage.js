import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

/**
 * ErrorMessage Component
 * Displays error messages with consistent styling
 * @param {string} message - Error message to display
 * @param {string} title - Optional error title
 * @param {function} onClose - Optional close handler
 */
const ErrorMessage = ({ message, title = 'Error', onClose }) => {
  if (!message) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Alert 
        severity="error" 
        onClose={onClose}
        sx={{ width: '100%' }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
