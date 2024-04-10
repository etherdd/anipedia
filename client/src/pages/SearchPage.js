import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';

import './SearchPage.css';

const config = require('../config.json');

export default function SearchPage() {

  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minRuntime, setMinRuntime] = useState();
  const [maxRuntime, setMaxRuntime] = useState();
  const [originalLanguage, setOriginalLanguage] = useState('');

  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/search_movies`)
  //     .then(res => res.json())
  //     .then(resJson => {
  //       const moviesWithId = resJson.map((movie) => ({ id: movie.imdb_id, ...movie }));
  //       setData(moviesWithId);
  //     });
  // }, []);

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search_movies?title=${title}` +
      `&production_country=${country}` +
      `&release_date_start=${startDate}&release_date_end=${endDate}` +
      `&runtime_min=${minRuntime}&runtime_max=${maxRuntime}` +
      `&original_language=${originalLanguage}`
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const moviesWithId = resJson.map((movie) => ({ id: movie.imdb_id, ...movie }));
        setData(moviesWithId);
      });
  }

  // This defines the columns of the table of songs used by the DataGrid component.
  // The format of the columns array and the DataGrid component itself is very similar to our
  // LazyTable component. The big difference is we provide all data to the DataGrid component
  // instead of loading only the data we need (which is necessary in order to be able to sort by column)
  const columns = [
    { field: 'title', headerName: 'Title', width: 300, renderCell: (params) => (
        <NavLink to={`/movie/${params.row.imdb_id}`}>{params.value}</NavLink>
    )},
    { field: 'production_countries', headerName: 'Country' },
    { field: 'original_language', headerName: 'Language' },
    { field: 'release_date', headerName: 'Release date' },
    { field: 'runtime', headerName: 'Runtime' }
  ]

  // This component makes uses of the Grid component from MUI (https://mui.com/material-ui/react-grid/).
  // The Grid component is super simple way to create a page layout. Simply make a <Grid container> tag
  // (optionally has spacing prop that specifies the distance between grid items). Then, enclose whatever
  // component you want in a <Grid item xs={}> tag where xs is a number between 1 and 12. Each row of the
  // grid is 12 units wide and the xs attribute specifies how many units the grid item is. So if you want
  // two grid items of the same size on the same row, define two grid items with xs={6}. The Grid container
  // will automatically lay out all the grid items into rows based on their xs values.
  return (
    <div className='search-page'>
      <div className='nav-bar-holding-block-on-search'></div>
      <Container style={{ color: "white", top: "60px"}} >
        <h2>Search Movie</h2>
        <Grid container spacing={2} alignItems="center" >
          <Grid item xs={8}>
            <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", height: '56px' }}/>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)', height: '56px', width: '80%'}}>Search</Button>
          </Grid>
        </Grid>
        
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '10px' }}>
        <Grid item>
            <FormControl style={{ minWidth: '120px' }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Country"
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'Japan'}>Japan</MenuItem>
                <MenuItem value={'USA'}>USA</MenuItem>
                {/* ... other country options */}
              </Select>
            </FormControl>
          </Grid>

          {/* Release Date Filter */}
          <Grid item>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Runtime Filter */}
          <Grid item>
            <TextField
              label="Min Runtime"
              type="number"
              value={minRuntime}
              onChange={(e) => setMinRuntime(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Max Runtime"
              type="number"
              value={maxRuntime}
              onChange={(e) => setMaxRuntime(e.target.value)}
            />
          </Grid>

          {/* Original Language Filter */}
          <Grid item>
            <FormControl style={{ minWidth: '120px' }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'ja'}>Japanese</MenuItem>
                <MenuItem value={'en'}>English</MenuItem>
                {/* ... other language options */}
              </Select>
            </FormControl>
          </Grid>

        </Grid>

                
        
        <h2>Results</h2>
        {/* Notice how similar the DataGrid component is to our LazyTable! What are the differences? */}
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          style={{color: 'white'}}
        />
      </Container>
    </div>
  );
}