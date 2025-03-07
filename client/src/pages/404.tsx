import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404: React.FC = () => {
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
        variant="h1"
        component="h1"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Sorry, we couldn&apos;t find the page you are looking for.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default Error404;
