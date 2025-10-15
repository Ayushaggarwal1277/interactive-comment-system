import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import { Send, Close } from '@mui/icons-material';

/**
 * ReplyInput Component
 * Inline input for replying to comments
 * @param {function} onSubmit - Callback when reply is submitted
 * @param {function} onCancel - Callback when cancel is clicked
 * @param {string} placeholder - Placeholder text
 */
const ReplyInput = ({ 
  onSubmit, 
  onCancel,
  placeholder = 'Write a reply...' 
}) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(text.trim());
      setText('');
      onCancel(); // Close reply input after successful submission
    } catch (err) {
      console.error('Error submitting reply:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: 'grey.50',
        borderRadius: 2,
        border: 1,
        borderColor: 'grey.300',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
          variant="outlined"
          size="small"
          autoFocus
          sx={{ mb: 1.5, backgroundColor: 'white' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            size="small"
            onClick={onCancel}
            disabled={isSubmitting}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="small"
            variant="contained"
            disabled={isSubmitting || !text.trim()}
            startIcon={<Send />}
          >
            Reply
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReplyInput;
