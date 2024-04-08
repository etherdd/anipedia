const mysql = require('mysql')
const config = require('./config.json');

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

/************************
 * TOP 10 Movies *
 ************************/

const ratingDefault = `SELECT *
  FROM movie
  WHERE vote_count > 5000
  ORDER BY vote_average DESC
  LIMIT 10;`;
const ratingBefore2000 = `SELECT *
  FROM movie
  WHERE release_date < '2000-01-01' AND vote_count > 5000
  ORDER BY vote_average DESC
  LIMIT 10;`;
const ratingEnglish = `SELECT *
  FROM movie
  WHERE original_language = 'en' AND vote_count > 5000
  ORDER BY vote_average DESC
  LIMIT 10;`;
const ratingJapanese = `SELECT *
  FROM movie
  WHERE original_language = 'ja' AND vote_count > 3000
  ORDER BY vote_average DESC
  LIMIT 10;`;
const ratingShortFilm = `SELECT *
  FROM movie
  WHERE runtime <= 40 AND vote_count > 900
  ORDER BY vote_average DESC
  LIMIT 10;`;

const popularityDefault = `SELECT *
  FROM movie
  ORDER BY popularity DESC
  LIMIT 10;`;
const popularityBefore2000 = `SELECT *
  FROM movie
  WHERE release_date < '2000-01-01'
  ORDER BY popularity DESC
  LIMIT 10;`;
const popularityEnglish = `SELECT *
  FROM movie
  WHERE original_language = 'en'
  ORDER BY popularity DESC
  LIMIT 10;`;
const popularityJapanese = `SELECT *
  FROM movie
  WHERE original_language = 'ja'
  ORDER BY popularity DESC
  LIMIT 10;`;
const popularityShortFilm = `SELECT *
  FROM movie
  WHERE runtime <= 40
  ORDER BY popularity DESC
  LIMIT 10;`;

const movies = async function(req, res) {
  let queryString = "";
  if (req.query.sortBy == 'rating') {
    if (req.query.tag == 'default') {
      queryString = ratingDefault;
    } else if (req.query.tag == 'before2000') {
      queryString = ratingBefore2000;
    } else if (req.query.tag == 'english') {
      queryString = ratingEnglish;
    } else if (req.query.tag == 'japanese') {
      queryString = ratingJapanese;
    } else if (req.query.tag == 'shortFilm') {
      queryString = ratingShortFilm;
    }
  } else if (req.query.sortBy == 'popularity') {
    if (req.query.tag == 'default') {
      queryString = popularityDefault;
    } else if (req.query.tag == 'before2000') {
      queryString = popularityBefore2000;
    } else if (req.query.tag == 'english') {
      queryString = popularityEnglish;
    } else if (req.query.tag == 'japanese') {
      queryString = popularityJapanese;
    } else if (req.query.tag == 'shortFilm') {
      queryString = popularityShortFilm;
    }
  } else {
    console.log("Invalid sortBy query parameter");
    res.json([]);
    return;
  }

  connection.query(queryString, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
  });
}


/************************
 * TOP 10 Persons *
 ************************/

const personDefault = `WITH TOP_10_DIRECTORS AS (SELECT d.directors_id, AVG(m.vote_average) AS vote
  FROM director d JOIN movie m on m.imdb_id = d.imdb_id
  WHERE m.vote_count > 1000
  GROUP BY d.directors_id
  HAVING COUNT(*) > 2
  ORDER BY AVG(m.vote_average) DESC
  LIMIT 10)
  SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`;
const personProlific = `SELECT d.directors_id, primaryName, COUNT(*) AS num_of_movies
  FROM director d
  JOIN movie m on m.imdb_id = d.imdb_id
  JOIN name n on d.directors_id = n.name_id
  GROUP BY d.directors_id
  ORDER BY COUNT(*) DESC
  LIMIT 10;`;
const personYoung = `SELECT d.directors_id, n.primaryName, (MIN(YEAR(m.release_date)) - n.birthYear) AS first_movie_age, m.title, n.birthYear
  FROM director d
  JOIN movie m on m.imdb_id = d.imdb_id
  JOIN name n on d.directors_id = n.name_id
  WHERE m.release_date IS NOT NULL AND n.birthYear IS NOT NULL
  GROUP BY d.directors_id, n.primaryName, m.title, n.birthYear
  ORDER BY first_movie_age
  LIMIT 10;`;
const personBefore2000 = `WITH TOP_10_DIRECTORS AS (SELECT d.directors_id, AVG(m.vote_average) AS vote
  FROM director d JOIN movie m on m.imdb_id = d.imdb_id
  WHERE m.vote_count > 1000 AND m.release_date < '2000-01-01'
  GROUP BY d.directors_id
  HAVING COUNT(*) > 2
  ORDER BY AVG(m.vote_average) DESC
  LIMIT 10)
  SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`;
const personEnglish = `WITH TOP_10_DIRECTORS AS (SELECT d.directors_id, AVG(m.vote_average) AS vote
  FROM director d JOIN movie m on m.imdb_id = d.imdb_id
  WHERE m.vote_count > 1000 AND original_language = 'en'
  GROUP BY d.directors_id
  HAVING COUNT(*) > 2
  ORDER BY AVG(m.vote_average) DESC
  LIMIT 10)
  SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`;
const personJapanese = `WITH TOP_10_DIRECTORS AS (SELECT d.directors_id, AVG(m.vote_average) AS vote
  FROM director d JOIN movie m on m.imdb_id = d.imdb_id
  WHERE m.vote_count > 500 AND original_language = 'ja'
  GROUP BY d.directors_id
  HAVING COUNT(*) > 2
  ORDER BY AVG(m.vote_average) DESC
  LIMIT 10)
  SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`;
const personFrench = `WITH TOP_10_DIRECTORS AS (SELECT d.directors_id, AVG(m.vote_average) AS vote
  FROM director d JOIN movie m on m.imdb_id = d.imdb_id
  WHERE m.vote_count >= 20 AND original_language = 'fr'
  GROUP BY d.directors_id
  ORDER BY AVG(m.vote_average) DESC
  LIMIT 10)
  SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`;
const personShortFilm = `WITH TOP_10_DIRECTORS AS (SELECT d.directors_id, AVG(m.vote_average) AS vote
  FROM director d JOIN movie m on m.imdb_id = d.imdb_id
  WHERE m.vote_count >= 10 AND runtime <= 40
  GROUP BY d.directors_id
  HAVING COUNT(*) >= 2
  ORDER BY AVG(m.vote_average) DESC
  LIMIT 10)
  SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`;

const persons = async function(req, res) {
  let queryString = "";
  // Another way to write if.. then.. series using switch().
  switch(req.query.tag) {
    case "personDefault":
      queryString = personDefault;
      break;
    case "personProlific":
      queryString = personProlific;
      break;
    case "personYoung":
      queryString = personYoung;
      break;
    case "personBefore2000":
      queryString = personBefore2000;
      break;
    case "personEnglish":
      queryString = personEnglish;
      break;
    case "personJapanese":
      queryString = personJapanese;
      break;
    case "personFrench":
      queryString = personFrench;
      break;
    case "personShortFilm":
      queryString = personShortFilm;
      break;
  }

  connection.query(queryString, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
  });
}


module.exports = {
  movies,
  persons
}
