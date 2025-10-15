import React from 'react';
import { Box } from '@mui/material';
import Layout from '../components/layout/Layout';
import Post from '../components/post/Post';
import CommentThread from '../components/comments/CommentThread';

/**
 * HomePage Component
 * Main page displaying the post and comment section
 */
const HomePage = () => {
  // Sample post data - replace with actual API call if needed
  const samplePost = {
    _id: 'default-post',
    title: 'Welcome to Our Interactive Comment Section',
    content: 'This is a modern, fully-featured comment section built with React and Material-UI. Feel free to share your thoughts, reply to others, and upvote interesting comments. The interface supports unlimited nested replies with smooth animations and responsive design!',
    author: {
      name: 'CommentHub Team',
      avatar: null,
    },
    imageUrl: null,
    createdAt: new Date().toISOString(),
    tags: ['Discussion', 'Community', 'Welcome'],
  };

  return (
    <Layout>
      <Box>
        {/* Post Display */}
        <Post post={samplePost} />

        {/* Comments Section */}
        <CommentThread postId={samplePost._id} />
      </Box>
    </Layout>
  );
};

export default HomePage;
