import { useEffect, useState } from "react";
import { Button, Tab, Tabs, Container } from "@mui/material";
import Backdrop from "../components/Backdrop";
import "./TopMoviePage.css";
import { useAuth0 } from "@auth0/auth0-react";

const config = require("../config.json");

const RANK_BY_RATING = "rating";
const RANK_BY_POPULARITY = "popularity";
const RANK_BY_USER = "forUser";

const DEFAULT_TAG = "default";
const BEFORE_2000_TAG = "before2000";
const ENGLISH_TAG = "english";
const JAPANESE_TAG = "japanese";
const SHORT_FILM_TAG = "shortFilm";

export default function TopMoviePage() {
  const { user, isAuthenticated } = useAuth0(); // isAuthenticated indicates if user is logged in
  const [rankBy, setRankBy] = useState(RANK_BY_RATING);
  const [tag, setTag] = useState(DEFAULT_TAG);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (rankBy === RANK_BY_USER) {
      setTag(DEFAULT_TAG);
      fetch(
        `${
          process.env.NODE_ENV === "production"
            ? config.production_server_host
            : `${config.server_host}:${config.server_port}`
        }/user/${user.sub}/movie_for_you`
      )
        .then((res) => res.json())
        .then((resJson) => setMovies(resJson));
    } else {
      fetch(
        `${
          process.env.NODE_ENV === "production"
            ? config.production_server_host
            : `${config.server_host}:${config.server_port}`
        }/top_movies?rankBy=${rankBy}&tag=${tag}`
      )
        .then((res) => res.json())
        .then((resJson) => setMovies(resJson));
    }
  }, [rankBy, tag, user]);

  const handleTabChange = (event, newValue) => {
    setRankBy(newValue);
  };

  return (
    <div className="top-picks-page">
      <div className="nav-bar-holding-block"></div>

      <Container style={{ color: "white", top: "60px", maxWidth: "90vw" }}>
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
          {isAuthenticated && (
            <Tab
              value={RANK_BY_USER}
              label="For You"
              style={{ color: rankBy === RANK_BY_USER ? "white" : "grey" }}
            />
          )}
        </Tabs>

        {/* If tab is "Rating Top 10" or "Popularity Top 10", show the filtering tags */}
        {rankBy !== RANK_BY_USER && (
          <div>
            {/* Before 2000 tag */}
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

            {/* English tag */}
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

            {/* Japanese tag */}
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

            {/* Short Film tag */}
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
        )}

        {/* Show different Titles varies by the tags selected */}
        {rankBy !== RANK_BY_USER && (
          <h2 style={{ color: "white", paddingLeft: "30px" }}>
            Top 10 {tag === ENGLISH_TAG && "English"}
            {tag === JAPANESE_TAG && "Japanese"}
            {tag === SHORT_FILM_TAG && "Short Film"} Animation Movies{" "}
            {tag === BEFORE_2000_TAG && "before 2000"}
          </h2>
        )}
        {rankBy === RANK_BY_USER && (
          <h2 style={{ color: "white", paddingLeft: "30px" }}>
            Hidden gems just for you :)
          </h2>
        )}

        {/* Show a list of 10 movies in a sliding way */}
        <div className="backdrop-div">
          {movies.map((movie) => (
            <Backdrop movie={movie} key={movie.imdb_id}></Backdrop>
          ))}
        </div>
      </Container>
    </div>
  );
}
