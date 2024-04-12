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

/********************************
 * DISPLAY PAGE *
 ********************************/

const movie = async function(req, res) {
  connection.query(`
    SELECT * 
    FROM movie
    WHERE imdb_id = '${req.params.movie_id}'
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data[0]);
      }
  });
}

const person = async function(req, res) {
  connection.query(`
    SELECT * 
    FROM person_view
    WHERE name_id = '${req.params.person_id}'
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data[0]);
      }
  });
}

//to be update
const person_movies = async function(req, res) {
  connection.query(`
  SELECT song_id, title, number, duration, plays
  FROM Songs
  WHERE album_id  = '${req.params.album_id}'
  ORDER BY number ASC
  `, (err, data) => {
    if (err || data.length === 0){
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}


module.exports = {
  movie,
  person,
  person_movies
}
