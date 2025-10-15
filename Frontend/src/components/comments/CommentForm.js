import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';

/**
 * CommentForm Component
 * Form for adding new top-level comments
 * @param {function} onSubmit - Callback when comment is submitted
 * @param {boolean} disabled - Disable form (e.g., when not logged in)
 * @param {string} placeholder - Placeholder text for input
 */
const CommentForm = ({ 
  onSubmit, 
  disabled = false,
  placeholder = 'Add a comment...' 
}) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(text.trim());
      setText(''); // Clear form on success
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        backgroundColor: disabled ? 'grey.50' : 'white',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder={disabled ? 'Login to comment' : placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled || isSubmitting}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={disabled || isSubmitting || !text.trim()}
            startIcon={<Send />}
          >
            Comment
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CommentForm;
