import api from './api';

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/api/users/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/api/users/current');
    return response.data;
  },

  // Google OAuth login
  googleLogin: async (credential) => {
    const response = await api.post('/api/users/google-login', { credential });
    return response.data;
  },
};

// Comments API calls
export const commentsAPI = {
  // Get all comments for a post
  getComments: async (postId, sortBy = 'newest') => {
    const response = await api.get(`/api/comments/${postId}`, {
      params: { sort: sortBy }
    });
    return response.data;
  },

  // Create a new comment
  createComment: async (commentData) => {
    const response = await api.post('/api/comments', commentData);
    return response.data;
  },

  // Reply to a comment
  replyToComment: async (commentId, replyData) => {
    const response = await api.post(`/api/comments/${commentId}/reply`, replyData);
    return response.data;
  },

  // Upvote a comment
  upvoteComment: async (commentId) => {
    const response = await api.post(`/api/comments/${commentId}/upvote`);
    return response.data;
  },
};

// Posts API calls (if needed in future)
export const postsAPI = {
  // Get a single post
  getPost: async (postId) => {
    const response = await api.get(`/api/posts/${postId}`);
    return response.data;
  },
};
