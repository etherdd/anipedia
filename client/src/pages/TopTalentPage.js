import { useEffect, useState } from 'react';
import { Button, Tab, Tabs,FormControl, InputLabel, Select, MenuItem, Container, Grid, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './TopTalentPage.css';

const config = require('../config.json');

const RANK_BY_RATING = 0;
const RANK_BY_POPULARITY = 1;

export default function TopTalentPage() {

  const [rankBy, setRankBy] = useState(RANK_BY_RATING);

  const [persons, setPersons] = useState([]);

  const handleTabChange = (event, newValue) => {
    setRankBy(newValue);
  };
  
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_persons?tag=personDefault`)
      .then(res => res.json())
      .then(resJson => setPersons(resJson));
  }, []);

  return (
    <div className='top-talent-page'>
      <div className='nav-bar-holding-block'></div>
      <Container style={{ color: "white", top: "60px"}}>
        <Tabs 
          value={rankBy} 
          onChange={handleTabChange} 
          aria-label="search tabs"
        >
          <Tab 
            value={RANK_BY_RATING}
            label="Rating Top 10" 
            style={{color: rankBy === RANK_BY_RATING ? 'white' : 'grey'}} 
          />
          <Tab 
            value={RANK_BY_POPULARITY}
            label="Popularity Top 10" 
            style={{color: rankBy === RANK_BY_POPULARITY ? 'white' : 'grey'}} 
          />
        </Tabs>
        <h2>Top 10 Directors</h2>
        {persons.map((person) =>
          <p key={person.name_id}>
            <NavLink to={`/person/${person.name_id}`}>{person.primaryName}</NavLink>
          </p>
        )}
      </Container>
    </div>
  );



  
}