import { useEffect, useState } from "react";
import { Button, Tab, Tabs, Container, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

import "./TopTalentPage.css";

const config = require("../config.json");

const TOP_10_DIRECTORS = "overallTop";
const FOR_YOU = "forUser";

const DEFAULT_TAG = "personDefault";
const PROLIFIC_TAG = "personProlific";
const YOUNG_TAG = "personYoung";
const BEFORE_2000_TAG = "personBefore2000";
const ENGLISH_TAG = "personEnglish";
const JAPANESE_TAG = "personJapanese";
const FRENCH_TAG = "personFrench";
const SHORT_FILM_TAG = "personShortFilm";

export default function TopTalentPage() {
  const { user, isAuthenticated } = useAuth0(); // isAuthenticated indicates if user is logged in
  const [rankBy, setRankBy] = useState(TOP_10_DIRECTORS);
  const navigate = useNavigate();
  const [tag, setTag] = useState(DEFAULT_TAG);
  const [persons, setPersons] = useState([]);

  const handleTabChange = (event, newValue) => {
    setRankBy(newValue);
  };

  const handleRowClick = (directorId) => {
    navigate(`/person-info/${directorId}`);
  };

  useEffect(() => {
    setPersons([]);
    if (rankBy === FOR_YOU) {
      if (!isAuthenticated) return;
      setTag(DEFAULT_TAG);
      fetch(
        `http://${process.env.SERVER_HOST || config.server_host}:${config.server_port}/user/${user.sub}/director_for_you`
      )
        .then((res) => res.json())
        .then((resJson) => setPersons(resJson));
    } else if (rankBy === TOP_10_DIRECTORS) {
      fetch(
        `http://${process.env.SERVER_HOST || config.server_host}:${config.server_port}/top_persons?tag=${tag}`
      )
        .then((res) => res.json())
        .then((resJson) => setPersons(resJson));
    }
  }, [rankBy, tag, isAuthenticated, user]);

  return (
    <div className="top-talent-page">
      <div className="nav-bar-holding-block"></div>
      <Container style={{ color: "white", top: "60px" }}>
        <Tabs
          value={rankBy}
          onChange={handleTabChange}
          aria-label="search tabs"
        >
          <Tab
            value={TOP_10_DIRECTORS}
            label="Top 10 Directors"
            style={{ color: rankBy === TOP_10_DIRECTORS ? "white" : "grey" }}
          />
          {isAuthenticated && <Tab
            value={FOR_YOU}
            label="For You"
            style={{ color: rankBy === FOR_YOU ? "white" : "grey" }}
          />}
        </Tabs>

        {/* If tab is "Top 10 Directors", show the filtering tags */}
        {rankBy === TOP_10_DIRECTORS && (
          <div>
            {/* Most Prolific tag */}
            <Button
              variant="outlined"
              size="small"
              style={
                tag === PROLIFIC_TAG
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
                  prevState === PROLIFIC_TAG ? DEFAULT_TAG : PROLIFIC_TAG
                );
              }}
            >
              Most Prolific
            </Button>

            {/* Youngest tag */}
            <Button
              variant="outlined"
              size="small"
              style={
                tag === YOUNG_TAG
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
                  prevState === YOUNG_TAG ? DEFAULT_TAG : YOUNG_TAG
                );
              }}
            >
              Youngest
            </Button>

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

            {/* French tag */}
            <Button
              variant="outlined"
              size="small"
              style={
                tag === FRENCH_TAG
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
                  prevState === FRENCH_TAG ? DEFAULT_TAG : FRENCH_TAG
                );
              }}
            >
              French
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

        {/* Show different Titles varies by the tab and tag selected */}
        {rankBy === TOP_10_DIRECTORS && (
          <h2 style={{ color: "white", paddingLeft: "10px" }}>
            Top 10 {tag === PROLIFIC_TAG && "Most Prolific"}
            {tag === YOUNG_TAG && "Youngest"}
            {tag === ENGLISH_TAG && "English"}
            {tag === JAPANESE_TAG && "Japanese"}
            {tag === FRENCH_TAG && "French"}
            {tag === SHORT_FILM_TAG && "Short Film"} Directors{" "}
            {tag === BEFORE_2000_TAG && "Before 2000"}
          </h2>
        )}
        {rankBy === FOR_YOU && (
          <h2 style={{ color: "white", paddingLeft: "10px" }}>
            These are the directors you don't want to miss :)
          </h2>
        )}

        {persons.length !== 0 && (
          <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="center">Director</TableCell>

                  {tag === YOUNG_TAG ? (
                    <>
                      <TableCell align="center">Birth Year</TableCell>
                      <TableCell align="center">First Movie Age</TableCell>
                      <TableCell align="center">Movie Title</TableCell>
                    </>
                  ) : tag === PROLIFIC_TAG ? (
                    <TableCell align="center">Number of movies</TableCell>
                  ) : (
                    <TableCell align="center">Average Vote</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {persons.map((person) => (
                  <TableRow
                    key={person.directors_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ backgroundColor: "#383838" }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <Link
                        onClick={() => handleRowClick(person.directors_id)}
                        style={{
                          color: "white",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        {person.primaryName}
                      </Link>
                    </TableCell>
                    {tag === YOUNG_TAG ? (
                      <>
                        <TableCell align="center">{person.birthYear}</TableCell>
                        <TableCell align="center">
                          {person.first_movie_age}
                        </TableCell>
                        <TableCell align="center">{person.title}</TableCell>
                      </>
                    ) : tag === PROLIFIC_TAG ? (
                      <TableCell align="center">
                        {person.num_of_movies}
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        {person.vote && person.vote.toFixed(2)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
}
