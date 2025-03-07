import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error500: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '98vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        Oops!
      </Typography>
      <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
        Something went wrong
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        An unexpected error occurred. Please try refreshing the page or come
        back later.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default Error500;
