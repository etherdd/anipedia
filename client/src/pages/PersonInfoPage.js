import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { NavLink } from 'react-router-dom';

import { formatReleaseDate } from '../helpers/formatter';

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
  <div className='person-info-page'>
    <div className='nav-bar-holding-block'></div>
    {personData.length > 0 && 
      (<div style={{color: 'white', height: "120px"}}>
        <Container>
          <div style={{height: '80px', display: 'flex', flexDirection: 'column'}}>
              <h2><p>{personData[0].primaryName}</p></h2>
          </div>
          <div style={{height: '100px', display: 'flex', flexDirection: 'column'}}>
              <h3><p>{personData[0].primaryProfession}</p></h3>
          </div>
        </Container>
          
          <div style={{color: 'white'}}>
              <Container style={flexFormat}>
                  {personData.map((personData) =>
                      <div key={personData.imdb_id}
                           style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                          <div style={{
                              height: '60px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between'
                          }}>
                              <p>{personData.original_title}</p>
                              {personData.release_date && <p>{formatReleaseDate(personData.release_date)}</p>}
                          </div>
                          <Box
                              p={5}
                              m={4}
                              style={{
                                  width: '300px',
                                  height: '400px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              }}
                          >
                            <NavLink to={`/movie/${personData.imdb_id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280/${personData.poster_path}`}
                                    alt={`${personData.title} movies`}
                                    style={{width: '200px', height: '300px'}}
                                />
                            </NavLink>
                          </Box>
                      </div>
                  )}
              </Container>
          </div>
      </div>)}
  </div>
);


}
