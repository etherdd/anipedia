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
 * BASIC SONG/ALBUM INFO ROUTES *
 ********************************/

const movie = async function(req, res) {
  connection.query(`
    SELECT * 
    FROM Songs
    WHERE song_id = '${req.params.song_id}'
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
    FROM Albums
    WHERE album_id = '${req.params.album_id}'
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data[0]);
      }
  });
}

const albums = async function(req, res) {
  // TODO (TASK 6): implement a route that returns all albums ordered by release date (descending)
  // Note that in this case you will need to return multiple albums, so you will need to return an array of objects
  connection.query(`
    SELECT *
    FROM Albums
    ORDER BY release_date DESC
    `, (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
  }); // replace this with your implementation
}

// Route 6: GET /album_songs/:album_id
const album_songs = async function(req, res) {
  // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)
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
  }); // replace this with your implementation
}

/************************
 * ADVANCED INFO ROUTES *
 ************************/

// Route 7: GET /top_songs
const top_songs = async function(req, res) {
  const page = req.query.page;
  // TODO (TASK 8): use the ternary (or nullish) operator to set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ? req.query.page_size : 10;
  const offset = page ? (page - 1) * pageSize : 0; // Calculate offset for pagination

  let sqlQuery = `
    SELECT s.song_id, s.title, s.album_id, a.title AS album, s.plays
    FROM Songs s
    JOIN Albums a ON s.album_id = a.album_id
    ORDER BY s.plays DESC
  `;

  if (!page) {
    // TODO (TASK 9)): query the database and return all songs ordered by number of plays (descending)
    // Hint: you will need to use a JOIN to get the album title as well
    connection.query(sqlQuery, (err, data) => {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    });
    // replace this with your implementation
  } else {
    // TODO (TASK 10): reimplement TASK 9 with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    connection.query(
      sqlQuery += ` LIMIT ${pageSize} OFFSET ${offset}`, 
      (err, data) => {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    });
  }
}

// Route 8: GET /top_albums
const top_albums = async function(req, res) {
  // TODO (TASK 11): return the top albums ordered by aggregate number of plays of all songs on the album (descending), with optional pagination (as in route 7)
  // Hint: you will need to use a JOIN and aggregation to get the total plays of songs in an album
  const page = req.query.page;
  const pageSize = req.query.page_size ? req.query.page_size : 10;
  const offset = page ? (page - 1) * pageSize : 0; 

  let sqlQuery = `
    SELECT a.album_id, a.title, SUM(s.plays) AS plays
    FROM Songs s
    JOIN Albums a ON s.album_id = a.album_id
    GROUP BY a.album_id
    ORDER BY SUM(s.plays) DESC
  `;

  if (!page) {
    connection.query(sqlQuery, (err, data) => {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    });
  } else {
    connection.query(
      sqlQuery += ` LIMIT ${pageSize} OFFSET ${offset}`, 
      (err, data) => {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    });
  }
}

// Route 9: GET /search_albums
const search_songs = async function(req, res) {
  // TODO (TASK 12): return all songs that match the given search query with parameters defaulted to those specified in API spec ordered by title (ascending)
  // Some default parameters have been provided for you, but you will need to fill in the rest
  const title = req.query.title ? `%${req.query.title}%` : '%';
  const durationLow = parseInt(req.query.duration_low) || 60;
  const durationHigh = parseInt(req.query.duration_high) || 660;
  const playsLow = parseInt(req.query.plays_low) || 60;
  const playsHigh = parseInt(req.query.plays_high) || 1100000000;
  const danceabilityLow = parseFloat(req.query.danceability_low) || 0;
  const danceabilityHigh = parseFloat(req.query.danceability_high) || 1;
  const energyLow = parseFloat(req.query.energy_low) || 0;
  const energyHigh = parseFloat(req.query.energy_high) || 1;
  const valenceLow = parseFloat(req.query.valence_low) || 0;
  const valenceHigh = parseFloat(req.query.valence_high) || 1;
  const explicit = req.query.explicit === 'true' ? '%' : 'false';


  // Construct the SQL query with dynamic filtering
  let sqlQuery = `
    SELECT *
    FROM Songs
    WHERE title LIKE ?
    AND plays BETWEEN ? AND ?
    AND duration BETWEEN ? AND ?
    AND danceability BETWEEN ? AND ?
    AND energy BETWEEN ? AND ?
    AND valence BETWEEN ? AND ?
    AND (explicit LIKE ? OR explicit = 'false')
    ORDER BY title ASC
  `;

  // Query parameters for the prepared statement
  const queryParams = [
    title,
    playsLow, playsHigh,
    durationLow, durationHigh,
    danceabilityLow, danceabilityHigh,
    energyLow, energyHigh,
    valenceLow, valenceHigh,
    explicit
  ];

  // Execute the query
  connection.query(sqlQuery, queryParams, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

module.exports = {
  author,
  random,
  song,
  album,
  albums,
  album_songs,
  top_songs,
  top_albums,
  search_songs,
}
