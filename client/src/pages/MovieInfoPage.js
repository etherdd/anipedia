import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentCard from '../components/CommentCard';
import './MovieInfoPage.css'

const config = require('../config.json');

export default function MovieInfoPage() {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = 
    useAuth0(); // isAuthenticated indicates if user is logged in
  const { movie_id } = useParams();
  const [ movieData, setMovieData] = useState([]);

  useEffect(() => {
    fetch(`http://${process.env.NODE_ENV === 'production' ? config.production_server_host : config.server_host}:${config.server_port}/movie/${movie_id}`)
      .then(res => res.json())
      .then(resJson => setMovieData(resJson));
  }, [movie_id]);

  // For Like button
  const [liked, setLiked] = useState(false);
  const handleLikeClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
      })
      return;
    }

    fetch(
      `http://${process.env.NODE_ENV === 'production' ? config.production_server_host : config.server_host}:${config.server_port}/movie/${movie_id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          select: !liked,
          user_id: user.sub,
        }),
      }
    )
    .then(response => response.json())
    .then((json) => {
      console.log(json)
      setLiked(!liked);
    });
  };

  useEffect(() => {
    if (user === undefined || user.sub === undefined) return;
    fetch(`http://${process.env.NODE_ENV === 'production' ? config.production_server_host : config.server_host}:${config.server_port}/movie/${movie_id}/like?user_id=${user.sub}`)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setLiked(resJson.like)});
  }, [user, movie_id])

  // Function to format release date to "YYYY-MM-DD" format
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

 return (
    <div className='movie-info-page'>
      <div className='nav-bar-holding-block'></div>
      <Container style={{ color: "white", top: "60px"}}>
        <div style={{ display: "flex", alignItems: "start" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>
              {movieData.title && !isLoading && (
                <>
                  {movieData.title}
                  {isAuthenticated &&     // If logged out, hide the like button
                    <button onClick={handleLikeClick} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "10px"}}>
                      {liked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon style={{ color: "white" }} />}
                    </button>
                  }
                </>
              )}
            </h2>
            {movieData.overview && (
              <>
                <h3>Overview</h3>
                <p>{movieData.overview}</p>
              </>
            )}
            {/* {console.log(movieData)} */}
            {movieData.vote_average && <p>Vote Average: {movieData.vote_average}</p>}
            {movieData.vote_count && <p>Vote Count: {movieData.vote_count}</p>}
            {movieData.status && <p>Status: {movieData.status}</p>}
            {movieData.release_date && <p>Release Date: {formatReleaseDate(movieData.release_date)}</p>}
            {movieData.runtime && <p>Runtime: {movieData.runtime}</p>}
            <p>Adult: {movieData.adult}</p>
            {movieData.homepage && <p>Homepage: {movieData.homepage}</p>}
            {movieData.original_language && <p>Original Language: {movieData.original_language}</p>}
            {movieData.original_title && <p>Original Title: {movieData.original_title}</p>}
            {movieData.popularity && <p>Popularity: {movieData.popularity}</p>}
            {movieData.tagline && <p>Tagline: {movieData.tagline}</p>}
            {movieData.genres && <p>Genres: {movieData.genres}</p>}
            {movieData.production_companies && <p>Production Companies: {movieData.production_companies}</p>}
            {movieData.production_countries && <p>Production Countries: {movieData.production_countries}</p>}
            {movieData.spoken_languages && <p>Spoken Languages: {movieData.spoken_languages}</p>}
          </div>
          <div>
            {movieData.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w1280/${movieData.poster_path}`} alt="Movie Poster" style={{ width: "400px", height: "600px" }} />
            )}
            <CommentCard movieId={movie_id}></CommentCard>
          </div>
        </div>
      </Container>
    </div>
  );
}