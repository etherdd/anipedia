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
  const productionCountry = req.query.production_country || 'all';
  const releaseDateStart = req.query.release_date_start || '1900-01-01';
  const releaseDateEnd = req.query.release_date_end || '2050-01-01';
  const runtimeMin = parseInt(req.query.runtime_min) || 0;
  const runtimeMax = parseInt(req.query.runtime_max) || 30000;
  const originalLanguage = req.query.original_language || 'all';



  // Construct the SQL query with dynamic filtering
  let sqlQuery = `
    SELECT
    imdb_id, title, production_countries, release_date, runtime, original_language
    FROM movie
    WHERE title LIKE ?
    AND release_date BETWEEN ? AND ?
    AND runtime BETWEEN ? AND ?
  `;

  // Query parameters for the prepared statement
  const queryParams = [
    title,
    releaseDateStart, releaseDateEnd,
    runtimeMin, runtimeMax
  ];

  if (productionCountry !== 'all') {
    sqlQuery = sqlQuery + 'AND production_countries = ?'
    queryParams.push(productionCountry);
  }

  if (originalLanguage !== 'all') {
    sqlQuery = sqlQuery + 'AND original_language = ?'
    queryParams.push(originalLanguage);
  }


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
