import { useEffect, useState } from "react";
import { Button, Container, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { useNavigate } from "react-router-dom";

import "./TopTalentPage.css";

const config = require("../config.json");

const DEFAULT_TAG = "personDefault";
const PROLIFIC_TAG = "personProlific";
const YOUNG_TAG = "personYoung";
const BEFORE_2000_TAG = "personBefore2000";
const ENGLISH_TAG = "personEnglish";
const JAPANESE_TAG = "personJapanese";
const FRANCH_TAG = "personFrench";
const SHORT_FILM_TAG = "personShortFilm";

export default function TopTalentPage() {
  const navigate = useNavigate();
  const [tag, setTag] = useState(DEFAULT_TAG);
  const [persons, setPersons] = useState([]);

  // const handleTabChange = (event, newValue) => {
  //   setRankBy(newValue);
  // };

  const handleRowClick = (directorId) => {
    navigate(`/person/${directorId}`);
  };

  useEffect(() => {
    setPersons([]);
    fetch(
      `http://${config.server_host}:${config.server_port}/top_persons?tag=${tag}`
    )
      .then((res) => res.json())
      .then((resJson) => setPersons(resJson));
  }, [tag]);

  return (
    <div className="top-talent-page">
      <div className="nav-bar-holding-block"></div>
      <Container style={{ color: "white", top: "60px" }}>
        {/* <Tabs
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
        </Tabs> */}
        <h2>
          Top 10 {tag === PROLIFIC_TAG && "Prolific"}
          {tag === YOUNG_TAG && "Young"}
          {tag === ENGLISH_TAG && "English"}
          {tag === JAPANESE_TAG && "Japanese"}
          {tag === FRANCH_TAG && "Franch"}
          {tag === SHORT_FILM_TAG && "Short Film"} Directors{" "}
          {tag === BEFORE_2000_TAG && "before 2000"}
        </h2>
        <Divider style={{ borderColor: "gray" }}></Divider>
        <div>
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
            Prolific
          </Button>
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
              // Set state can set the new state based on the prev state
              setTag((prevState) =>
                prevState === YOUNG_TAG ? DEFAULT_TAG : YOUNG_TAG
              );
            }}
          >
            Young
          </Button>
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
              tag === FRANCH_TAG
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
                prevState === FRANCH_TAG ? DEFAULT_TAG : FRANCH_TAG
              );
            }}
          >
            Franch
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

        {persons.length != 0 && (
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
                        style={{ color: "white", cursor: "pointer" }}
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
