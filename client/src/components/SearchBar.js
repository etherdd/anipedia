import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchComponent = () => {
  const title = "";

  return (
    <Grid container spacing={2} style={{ padding: '100px', paddingTop: '30px', paddingBottom: '30px'}}>
    <Grid item xs={10}>
      <TextField label='Title' value={title} style={{ width: "100%", height: '56px' }}/>
    </Grid>
    <Grid item xs={2}>
      <Button  style={{ color:'white', background: 'grey', height: '56px', width: '100%'}}>Search</Button>
    </Grid>
  </Grid>
  );
};

export default SearchComponent;
