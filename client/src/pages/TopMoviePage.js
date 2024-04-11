import { useEffect, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "./TopMoviePage.css";

const config = require("../config.json");

const RANK_BY_RATING = "rating";
const RANK_BY_POPULARITY = "popularity";

const DEFAULT_TAG = "default";
const BEFORE_2000_TAG = "before2000";
const ENGLISH_TAG = "english";
const JAPANESE_TAG = "japanese";
const SHORT_FILM_TAG = "shortFilm";

export default function TopMoviePage() {
  const [rankBy, setRankBy] = useState(RANK_BY_RATING);
  const [tag, setTag] = useState(DEFAULT_TAG);
  const [movies, setMovies] = useState([]);

  const handleTabChange = (event, newValue) => {
    setRankBy(newValue);
  };

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/top_movies?rankBy=${rankBy}&tag=${tag}`
    )
      .then((res) => res.json())
      .then((resJson) => setMovies(resJson));
  }, [rankBy, tag]);

  return (
    <div className="top-picks-page">
      <div className="nav-bar-holding-block"></div>

      <Container style={{ color: "white", top: "60px" }}>
        <Tabs
          value={rankBy}
          onChange={handleTabChange}
          aria-label="search tabs"
        >
          <Tab
            value={RANK_BY_RATING}
            label="Rating Top 10"
            style={{ color: rankBy === RANK_BY_RATING ? "white" : "grey" }}
          />
          <Tab
            value={RANK_BY_POPULARITY}
            label="Popularity Top 10"
            style={{ color: rankBy === RANK_BY_POPULARITY ? "white" : "grey" }}
          />
        </Tabs>

        <div>
          <Button
            variant="outlined"
            size="small"
            style={
              tag === BEFORE_2000_TAG
                ? {
                    textTransform: "none",
                    margin: "30px 10px",
                    color: "white",
                    backgroundColor: "grey",
                  }
                : { textTransform: "none", margin: "30px 10px" }
            }
            onClick={() => {
              // Set state can set the new state based on the prev state
              setTag((prevState) =>
                prevState === BEFORE_2000_TAG ? DEFAULT_TAG : BEFORE_2000_TAG
              );
            }}
          >
            Before 2000
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={
              tag === ENGLISH_TAG
                ? {
                    textTransform: "none",
                    margin: "30px 10px",
                    color: "white",
                    backgroundColor: "grey",
                  }
                : { textTransform: "none", margin: "30px 10px" }
            }
            onClick={() => {
              setTag((prevState) =>
                prevState === ENGLISH_TAG ? DEFAULT_TAG : ENGLISH_TAG
              );
            }}
          >
            English
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={
              tag === JAPANESE_TAG
                ? {
                    textTransform: "none",
                    margin: "30px 10px",
                    color: "white",
                    backgroundColor: "grey",
                  }
                : { textTransform: "none", margin: "30px 10px" }
            }
            onClick={() => {
              setTag((prevState) =>
                prevState === JAPANESE_TAG ? DEFAULT_TAG : JAPANESE_TAG
              );
            }}
          >
            Japanese
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={
              tag === SHORT_FILM_TAG
                ? {
                    textTransform: "none",
                    margin: "30px 10px",
                    color: "white",
                    backgroundColor: "grey",
                  }
                : { textTransform: "none", margin: "30px 10px" }
            }
            onClick={() => {
              setTag((prevState) =>
                prevState === SHORT_FILM_TAG ? DEFAULT_TAG : SHORT_FILM_TAG
              );
            }}
          >
            Short Film
          </Button>
        </div>

        <h2 style={{ color: "white" }}>
          Top 10 {tag === ENGLISH_TAG && "English"}
          {tag === JAPANESE_TAG && "Japanese"}
          {tag === SHORT_FILM_TAG && "Short Film"} Animations{" "}
          {tag === BEFORE_2000_TAG && "before 2000"}
        </h2>

        {movies.map((movie) => (
          <p key={movie.imdb_id}>
            <NavLink to={`/movie/${movie.imdb_id}`}>{movie.title}</NavLink>
          </p>
        ))}
      </Container>
    </div>
  );
}
