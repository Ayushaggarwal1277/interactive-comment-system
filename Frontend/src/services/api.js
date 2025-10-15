import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true, // Send cookies with requests
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set Content-Type based on data type
    // If data is FormData, let browser set the Content-Type (with boundary)
    // Otherwise, use application/json
    if (config.data instanceof FormData) {
      // Don't set Content-Type - browser will set it with boundary
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      // Return error message from server
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Network error - no response received
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Other errors
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
