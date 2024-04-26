import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tab, Tabs,FormControl, InputLabel, Select, MenuItem, Container, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';

import './SearchPage.css';

const config = require('../config.json');

const SEARCH_MOVIE = 0;
const SEARCH_PERSON = 1;

const languageOptions = [
  { value: 'all', label: 'All' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: 'Japanese' },
  { value: 'fr', label: 'French' },
  { value: 'ru', label: 'Russian' },
  { value: 'es', label: 'Spanish' },
  { value: 'de', label: 'German' }
];

const countryOptions = [
  { value: 'all', label: 'All' },
  { value: 'United States of America', label: 'USA' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Soviet Union', label: 'Soviet Union' },
  { value: 'France', label: 'France' },
  { value: 'Canada', label: 'Canada' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Spain', label: 'Spain' },
  { value: 'China', label: 'China' },
];

const roleOptions = [
  { value: 'all', label: 'all' },
  { value: 'director', label: 'director' },
  { value: 'writer', label: 'writer' },
  { value: 'actor', label: 'actor' },
  { value: 'producer', label: 'producer' },
  { value: 'composer', label: 'composer' },
  { value: 'editor', label: 'editor' },
  { value: 'cinematographer', label: 'cinematographer' },
  { value: 'production_designer', label: 'production designer' },
  { value: 'archive_footage', label: 'archive footage' },
  { value: 'archive_sound', label: 'archive sound' },
];

export default function SearchPage() {

  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [personData, setPersonData] = useState([]);

  const { keyword } = useParams();
  const [searchType, setSearchType] = useState(SEARCH_MOVIE);

  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minRuntime, setMinRuntime] = useState('');
  const [maxRuntime, setMaxRuntime] = useState('');
  const [originalLanguage, setOriginalLanguage] = useState('');

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [startDatePerson, setStartDatePerson] = useState('');
  const [endDatePerson, setEndDatePerson] = useState('');
  const [minRuntimePerson, setMinRuntimePerson] = useState('');
  const [maxRuntimePerson, setMaxRuntimePerson] = useState('');
  const [originalLanguagePerson, setOriginalLanguagePerson] = useState('');

  useEffect(() => {
    if (keyword) {
      setTitle(keyword);
      fetch(`http://${process.env.NODE_ENV === 'production' ? config.production_server_host : config.server_host}:${config.server_port}/search_movies?title=${keyword}`)
      .then(res => res.json())
      .then(resJson => {
        const moviesWithId = resJson.map((movie) => ({ id: movie.imdb_id, ...movie }));
        setData(moviesWithId);
      });
    }
  }, [keyword]);


  const handleSearchChange = (event, newValue) => {
    setSearchType(newValue);
  };

  const searchMovie = () => {
    fetch(`http://${process.env.NODE_ENV === 'production' ? config.production_server_host : config.server_host}:${config.server_port}/search_movies?title=${title}` +
      `&production_country=${country}` +
      `&release_date_start=${startDate}&release_date_end=${endDate}` +
      `&runtime_min=${minRuntime}&runtime_max=${maxRuntime}` +
      `&original_language=${originalLanguage}`
    )
      .then(res => res.json())
      .then(resJson => {
        const moviesWithId = resJson.map((movie) => ({ id: movie.imdb_id, ...movie }));
        setData(moviesWithId);
      });
  }


  const searchPerson = () => {
    fetch(`http://${process.env.NODE_ENV === 'production' ? config.production_server_host : config.server_host}:${config.server_port}/search_persons?name=${name}` +
      `&role=${role}` +
      `&release_date_start=${startDatePerson}&release_date_end=${endDatePerson}` +
      `&runtime_min=${minRuntimePerson}&runtime_max=${maxRuntimePerson}` +
      `&original_language=${originalLanguagePerson}`
    )
      .then(res => res.json())
      .then(resJson => {
        const personWithId = resJson.map((person) => ({ id: `${person.name_id}_${person.category}_${person.imdb_id}`, ...person }));
        setPersonData(personWithId);
      });
  }


  const columns = [
    { field: 'title', headerName: 'Title', flex: 1, renderCell: (params) => (
      <NavLink style={{ color: 'white' }} to={`/movie-info/${params.row.imdb_id}`}>{params.value}</NavLink>
    )},
    { field: 'production_countries', width: 150, headerName: 'Country' },
    { field: 'original_language',  width: 100, headerName: 'Language' },
    { field: 'release_date',  width: 120,headerName: 'Release date', renderCell: (params) => ( params.value.split('T')[0] )},
    { field: 'runtime',  width: 100, headerName: 'Runtime' }
  ]

  if (searchType === SEARCH_PERSON){
    columns.splice(1,1);
    const nameColumn = { field: 'primaryName', headerName: 'Name', flex:0.5, renderCell: (params) => (
      <NavLink style={{ color: 'white' }} to={`/person-info/${params.row.name_id}`}>{params.value}</NavLink>
    )}
    const categoryColumn = { field: 'category', headerName: 'Role', flex:0.3};
    columns.unshift(categoryColumn);
    columns.unshift(nameColumn);
  }

 
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
        <> 
        <Grid item xs={3}>
            <FormControl style={{ width: "100%"}} >
              <InputLabel>Production Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Production Country"
              >
                {countryOptions.map(option => (
                <MenuItem key={option.value} style={{color: "grey"}} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Original Language Filter */}
          <Grid item xs={3}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                label="Language"
              >
                {languageOptions.map(option => (
                <MenuItem key={option.value} style={{color: "grey"}} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
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

          </>
          }

        {searchType === SEARCH_PERSON && 
        <>
        <Grid item xs={3}>
            <FormControl style={{ width: "100%"}} >
              <InputLabel>Role</InputLabel>
              <Select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                {roleOptions.map(option => (
                <MenuItem key={option.value} style={{color: "grey"}} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Original Language Filter */}
          <Grid item xs={3}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={originalLanguagePerson}
                onChange={(e) => setOriginalLanguagePerson(e.target.value)}
                label="Language"
              >
                {languageOptions.map(option => (
                <MenuItem key={option.value} style={{color: "grey"}} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Release Date Filter */}
          <Grid item xs={1.5}>
            <TextField
              label="Start Date"
              type="date"
              value={startDatePerson}
              onChange={(e) => setStartDatePerson(e.target.value)}
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
              value={endDatePerson}
              onChange={(e) => setEndDatePerson(e.target.value)}
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
              value={minRuntimePerson}
              onChange={(e) => setMinRuntimePerson(e.target.value)}
              inputProps={{ min: "0" }}
              style={{ marginRight: '10px', width: "100%" }}
            />
           </Grid>
          <Grid item xs={1.5}>
            <TextField
              label="Max Runtime"
              type="number"
              value={maxRuntimePerson}
              onChange={(e) => setMaxRuntimePerson(Math.max(0, +e.target.value))}
              inputProps={{ min: "0" }}
              style={{ width: "100%"  }}
            />
          </Grid>
          </>
          }          
        </Grid>

                
        
        {searchType === SEARCH_MOVIE && 
        <>
          <h2>Search Movie
          {/* {console.log(data)} */}
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
            {/* {console.log(personData)} */}
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