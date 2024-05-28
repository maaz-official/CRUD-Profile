import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h2" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
