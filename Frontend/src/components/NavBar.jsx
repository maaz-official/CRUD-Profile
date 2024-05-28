import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function NavBar() {
  return (
    <div style={{ marginTop: '3px' }}>

    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
          Muhammad Maaz
        </Typography>
        <Button component={Link} to="/" color="inherit" style={{ color: 'black' }}>
          Home
        </Button>
        <Button component={Link} to="/create-user" color="inherit" style={{ color: 'black' }}>
          Create Profile
        </Button>
      </Toolbar>
      </AppBar>
    </div>
  );
}
