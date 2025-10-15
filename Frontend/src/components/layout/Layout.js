import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

/**
 * Layout Component
 * Main layout wrapper with navbar and content area
 */
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'grey.50',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
