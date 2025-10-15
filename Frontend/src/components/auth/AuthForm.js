import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Avatar,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera, DeleteOutline } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * AuthForm Component
 * Handles both login and registration with validation
 * Supports Google OAuth integration
 */
const AuthForm = () => {
  const navigate = useNavigate();
  const { login, register, googleLogin, loading } = useAuth();
  
  const [tabValue, setTabValue] = useState(0); // 0 = login, 1 = register
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Avatar state
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setValidationErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setValidationErrors(prev => ({ ...prev, avatar: 'Please upload a valid image (JPG, PNG, GIF, or WebP)' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setValidationErrors(prev => ({ ...prev, avatar: 'Image must be less than 5MB' }));
      return;
    }

    // Clear any previous avatar errors
    setValidationErrors(prev => ({ ...prev, avatar: '' }));

    // Set file and create preview
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove avatar
  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setValidationErrors(prev => ({ ...prev, avatar: '' }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Registration specific validation
    if (tabValue === 1) {
      if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      let result;
      if (tabValue === 0) {
        // Login
        result = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register with avatar
        const registerData = new FormData();
        registerData.append('name', formData.name.trim());
        registerData.append('email', formData.email);
        registerData.append('password', formData.password);
        
        if (avatarFile) {
          registerData.append('avatar', avatarFile);
        }

        result = await register(registerData);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  // Handle Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Google authentication failed');
      }
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google authentication was cancelled or failed.');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Welcome
        </Typography>
        
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Join the conversation
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          {tabValue === 1 && (
            <>
              {/* Avatar Upload Section */}
              <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={avatarPreview}
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2.5rem',
                  }}
                >
                  {!avatarPreview && (formData.name ? formData.name[0].toUpperCase() : 'U')}
                </Avatar>
                
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                    size="small"
                  >
                    {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleAvatarChange}
                    />
                  </Button>
                  
                  {avatarPreview && (
                    <IconButton
                      color="error"
                      size="small"
                      onClick={handleRemoveAvatar}
                      aria-label="remove avatar"
                    >
                      <DeleteOutline />
                    </IconButton>
                  )}
                </Stack>
                
                {validationErrors.avatar && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {validationErrors.avatar}
                  </Typography>
                )}
                
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Optional • JPG, PNG, GIF or WebP • Max 5MB
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                sx={{ mb: 2 }}
                autoComplete="name"
              />
            </>
          )}

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            sx={{ mb: 2 }}
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            sx={{ mb: 2 }}
            autoComplete={tabValue === 0 ? 'current-password' : 'new-password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {tabValue === 1 && (
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!validationErrors.confirmPassword}
              helperText={validationErrors.confirmPassword}
              sx={{ mb: 2 }}
              autoComplete="new-password"
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mb: 2, py: 1.5 }}
          >
            {tabValue === 0 ? 'Login' : 'Register'}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
          />
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Typography>
      </Paper>
    </Box>
  );
};

export default AuthForm;
