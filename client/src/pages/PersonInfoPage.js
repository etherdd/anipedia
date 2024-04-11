import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { NavLink } from 'react-router-dom';

import { formatDuration, formatReleaseDate } from '../helpers/formatter';

import './PersonInfoPage.css';

const config = require('../config.json');

export default function PersonInfoPage() {

  const { person_id } = useParams();
  const [ personData, setPersonData] = useState([]);


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/person/${person_id}`)
      .then(res => res.json())
      .then(resJson => {
          setPersonData(resJson)
      });
  }, [person_id]);

  const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' ,color: "white", top: "60px"};
  return (
      <Container style={flexFormat}>
        {personData.map((personData) =>
            <Box
                key={personData.imdb_id}
                p={5}
                m={4}
                style={{
                  background: 'black',
                  borderRadius: '16px',
                  border: '2px solid #000',
                  width: '300px',
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', // Align items in the center vertically
                  justifyContent: 'center', // Align items in the center horizontally
                }}
            >
              <img
                  src={`https://image.tmdb.org/t/p/w1280/${personData.poster_path}`}
                  alt={`${personData.title} movies`}
                  style={{width: '200px', height: '300px'}}
              />
              <h4><NavLink to={`/movie/${personData.imdb_id}`}></NavLink></h4>
            </Box>
        )}
      </Container>
  );
}
