import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px', // Applied margin as requested
      }}
    >
      <TextField
        sx={{
          background: 'rgba(255, 255, 255, 0.5)', // White background with 50% transparency
          //maxWidth: '300px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px 0 0 4px', // Rounded corners on the left side only
            height: '56px', // Standard height to align with the Button
          }
        }}
        variant="outlined"
        fullWidth // Make TextField responsive within the Box constraints
      />
      <Button
        sx={{
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: '#333', // Slightly darker on hover
          },
          height: '56px', // Ensuring the Button height matches the TextField
          width: '100px', // Ensuring the Button height matches the TextField
          borderRadius: '0 4px 4px 0', // Rounded corners on the right side only
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchComponent;
