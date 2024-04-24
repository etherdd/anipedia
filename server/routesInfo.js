const mysql = require('mysql')
const config = require('./config.json')

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

const cache = {}

/********************************
 * DISPLAY PAGE *
 ********************************/

const movie = async function(req, res) {
  const queryString = `
  SELECT * 
  FROM movie
  WHERE imdb_id = '${req.params.movie_id}'
  `;
  if (queryString in cache) {
    console.log("Found result from cache");
    return res.json(cache[queryString]);
  }
  connection.query(queryString, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        cache[queryString] = data[0];
        res.json(data[0]);
      }
  });
}

const person = async function(req, res) {
  const queryString = `
  SELECT * 
  FROM name
  LEFT JOIN person_view on person_view.name_id = name.name_id
  WHERE name.name_id = '${req.params.person_id}'
  `;
  if (queryString in cache) {
    console.log("Found result from cache");
    return res.json(cache[queryString]);
  }
  connection.query(queryString, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        cache[queryString] = data;
        res.json(data);
      }
  });
}

//to be update
const person_movies = async function(req, res) {
  const queryString = `
  SELECT *
  FROM person_view
  WHERE name_id = '${req.params.person_id}'
  `;
  if (queryString in cache) {
    console.log("Found result from cache");
    return res.json(cache[queryString]);
  }
  connection.query(queryString, (err, data) => {
    if (err || data.length === 0){
      console.log(err);
      res.json([]);
    } else {
      cache[queryString] = data;
      res.json(data);
    }
  });
}


module.exports = {
  movie,
  person,
  person_movies
}
