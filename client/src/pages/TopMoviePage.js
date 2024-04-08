import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './TopMoviePage.css';

const config = require('../config.json');

export default function TopMoviePage() {

  /*const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/albums`)
      .then(res => res.json())
      .then(resJson => setAlbums(resJson));
  }, []);

  // flexFormat provides the formatting options for a "flexbox" layout that enables the album cards to
  // be displayed side-by-side and wrap to the next line when the screen is too narrow. Flexboxes are
  // incredibly powerful. You can learn more on MDN web docs linked below (or many other online resources)
  // https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
  const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };

  return (
    // TODO (TASK 22): replace the empty object {} in the Container's style property with flexFormat. Observe the change to the Albums page.
    // TODO (TASK 22): then uncomment the code to display the cover image and once again observe the change, i.e. what happens to the layout now that each album card has a fixed width?
    // This task is just to help you better understand formatting dynamically displayed data. No written explanation of the effects is necessary.
    <Container style={{}}>
      {albums.map((album) =>
        <Box
          key={album.album_id}
          p={3}
          m={2}
          style={{ background: 'white', borderRadius: '16px', border: '2px solid #000' }}
        >
          {
          <img
            src={album.thumbnail_url}
            alt={`${album.title} album art`}
          />
          }
          <h4><NavLink to={`/albums/${album.album_id}`}>{album.title}</NavLink></h4>
        </Box>
      )}
    </Container>
  );*/

  const movieTest = {
    title: "Howl's Moving Castle",
    imdb_id: 'tt0347149'
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_movies?sortBy=rating&tag=japanese`)
      .then(res => res.json())
      .then(resJson => setMovies(resJson));
  }, []);

  return (
    <div className='top-picks-page'>
      <div className='nav-bar-holding-block'></div>

      <Container style={{ color: "white", top: "60px" }} >

      
        <h2 style={{ color: "white" }}>Top 10 Animations</h2>
        <h4>Hardcode movie test:</h4>
        <p>
          <NavLink to={`/movie/${movieTest.imdb_id}`}>{movieTest.title}</NavLink>
        </p>
        <h4>Database movie test</h4>
        {/* {console.log(movies)} */}
        {movies.map((movie) =>
          <p key={movie.imdb_id}>
            <NavLink to={`/movie/${movie.imdb_id}`}>{movie.title}</NavLink>
          </p>
        )}
      {/* <h2>Top Albums</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_albums`} columns={albumColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]} />
      <Divider /> */}
      </Container>
    </div>
  );

  
}