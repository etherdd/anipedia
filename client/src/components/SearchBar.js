import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';

const SearchComponent = () => {

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${keyword}`);;
  };

  return (
    <Grid container spacing={2} style={{ margin: 'auto', width: '60%', padding: '100px', paddingTop: '30px', paddingBottom: '0px'}}>
      <Grid item xs={10}>
        <TextField 
          label='Title'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: "100%", height: '56px' }}/>
      </Grid>
      <Grid item xs={2}>
      <Button 
        onClick={handleSearch} 
        style={{ color:'white', background: '#333', height: '56px', width: '100%'}}
        >Search</Button>
    </Grid>
  </Grid>
  );
};

export default SearchComponent;
