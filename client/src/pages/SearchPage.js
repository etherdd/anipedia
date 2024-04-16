import { useState } from 'react';
import { Button, Tab, Tabs,FormControl, InputLabel, Select, MenuItem, Container, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';

import './SearchPage.css';

const config = require('../config.json');

const SEARCH_MOVIE = 0;
const SEARCH_PERSON = 1;

export default function SearchPage() {

  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [personData, setPersonData] = useState([]);


  const [searchType, setSearchType] = useState(SEARCH_MOVIE);

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minRuntime, setMinRuntime] = useState('');
  const [maxRuntime, setMaxRuntime] = useState('');
  const [originalLanguage, setOriginalLanguage] = useState('');

  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/search_movies`)
  //     .then(res => res.json())
  //     .then(resJson => {
  //       const moviesWithId = resJson.map((movie) => ({ id: movie.imdb_id, ...movie }));
  //       setData(moviesWithId);
  //     });
  // }, []);

  const handleSearchChange = (event, newValue) => {
    setSearchType(newValue);
  };

  const searchMovie = () => {
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


  const searchPerson = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search_persons?name=${name}` +
      `&role=${role}` +
      `&release_date_start=${startDate}&release_date_end=${endDate}` +
      `&runtime_min=${minRuntime}&runtime_max=${maxRuntime}` +
      `&original_language=${originalLanguage}`
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const personWithId = resJson.map((person) => ({ id: person.imdb_id, ...person }));
        setPersonData(personWithId);
      });
  }

  // This defines the columns of the table of songs used by the DataGrid component.
  // The format of the columns array and the DataGrid component itself is very similar to our
  // LazyTable component. The big difference is we provide all data to the DataGrid component
  // instead of loading only the data we need (which is necessary in order to be able to sort by column)
  const columns = [
    { field: 'title', headerName: 'Title', flex: 1, renderCell: (params) => (
      <NavLink style={{ color: 'white' }} to={`/movie/${params.row.imdb_id}`}>{params.value}</NavLink>
    )},
    { field: 'production_countries', width: 150, headerName: 'Country' },
    { field: 'original_language',  width: 100, headerName: 'Language' },
    { field: 'release_date',  width: 120,headerName: 'Release date', renderCell: (params) => ( params.value.split('T')[0] )},
    { field: 'runtime',  width: 100, headerName: 'Runtime' }
  ]

  if (searchType === SEARCH_PERSON){
    columns.splice(1,1);
    const nameColumn = { field: 'primaryName', headerName: 'Name', flex:0.5, renderCell: (params) => (
      <NavLink style={{ color: 'white' }} to={`/person/${params.row.name_id}`}>{params.value}</NavLink>
    )}
    const categoryColumn = { field: 'category', headerName: 'Role', flex:0.3};
    columns.unshift(categoryColumn);
    columns.unshift(nameColumn);
  }

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
        <Tabs 
          value={searchType} 
          onChange={handleSearchChange} 
          aria-label="search tabs"
        >
            <Tab 
              value={SEARCH_MOVIE}
              label="Search Movie" 
              style={{color: searchType === SEARCH_MOVIE ? 'white' : 'grey'}} 
            />
            <Tab 
              value={SEARCH_PERSON}
              label="Search Person" 
              style={{color: searchType === SEARCH_PERSON ? 'white' : 'grey'}} 
          />
        </Tabs>

        {searchType === SEARCH_MOVIE && 
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '10px'}}>
          <Grid item xs={10}>
            <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", height: '56px' }}/>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => searchMovie() } style={{ color:'white', background: 'grey', left: '50%', transform: 'translateX(-50%)', height: '56px', width: '100%'}}>Search</Button>
          </Grid>
        </Grid>
        }

        {searchType === SEARCH_PERSON && 
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '10px'}}>
          <Grid item xs={10}>
            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", height: '56px' }}/>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => searchPerson() } style={{ color:'white', background: 'grey', left: '50%', transform: 'translateX(-50%)', height: '56px', width: '100%'}}>Search</Button>
          </Grid>
        </Grid>
        }
        
        <Grid container spacing={2}  style={{ marginTop: '10px'}}>
        {searchType === SEARCH_MOVIE && 
        <Grid item xs={3}>
            <FormControl style={{ width: "100%"}} >
              <InputLabel>Production Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Production Country"
              >
                <MenuItem style={{color: "grey"}} value={'all'}>All</MenuItem>
                <MenuItem style={{color: "grey"}} value={'Japan'}>Japan</MenuItem>
                <MenuItem style={{color: "grey"}} value={'United States'}>USA</MenuItem>
                {/* ... other country options */}
              </Select>
            </FormControl>
          </Grid>
          }

        {searchType === SEARCH_PERSON && 
        <Grid item xs={3}>
            <FormControl style={{ width: "100%"}} >
              <InputLabel>Role</InputLabel>
              <Select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem style={{color: "grey"}} value={'all'}>All</MenuItem>
                <MenuItem style={{color: "grey"}} value={'director'}>Director</MenuItem>
                <MenuItem style={{color: "grey"}} value={'writer'}>Writer</MenuItem>
                {/* ... other country options */}
              </Select>
            </FormControl>
          </Grid>
          }          

          {/* Original Language Filter */}
          <Grid item xs={3}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem style={{color: "grey"}} value={'all'}>All</MenuItem>
                <MenuItem style={{color: "grey"}} value={'ja'}>Japanese</MenuItem>
                <MenuItem style={{color: "grey"}} value={'en'}>English</MenuItem>
                {/* ... other language options */}
              </Select>
            </FormControl>
          </Grid>

          {/* Release Date Filter */}
          <Grid item xs={1.5}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '10px', width: "100%"  }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ width: "100%" }}
            />
          </Grid>

          {/* Runtime Filter */}
          <Grid item xs={1.5}>
            <TextField
              label="Min Runtime"
              type="number"
              value={minRuntime}
              onChange={(e) => setMinRuntime(e.target.value)}
              inputProps={{ min: "0" }}
              style={{ marginRight: '10px', width: "100%" }}
            />
           </Grid>
          <Grid item xs={1.5}>
            <TextField
              label="Max Runtime"
              type="number"
              value={maxRuntime}
              onChange={(e) => setMaxRuntime(Math.max(0, +e.target.value))}
              inputProps={{ min: "0" }}
              style={{ width: "100%"  }}
            />
          </Grid>

        </Grid>

                
        
        {searchType === SEARCH_MOVIE && 
        <>
          <h2>Search Movie
         { console.log(data)}
          </h2>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
            style={{background: '#333', color: 'white'}}
          />
        </>}

        {searchType === SEARCH_PERSON && 
        <>
          <h2>Search Person
            {console.log(personData)}
          </h2>
          <DataGrid
            rows={personData}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
            style={{background: '#333', color: 'white'}}
          />
        </>}
      </Container>
    </div>
  );
}