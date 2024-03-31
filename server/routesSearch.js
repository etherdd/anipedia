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


const search_movies = async function(req, res) {
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

const search_persons = async function(req, res) {

}

module.exports = {
  search_movies,
  search_persons,
}
