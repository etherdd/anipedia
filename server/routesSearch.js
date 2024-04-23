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
    imdb_id, title, production_countries, release_date, runtime, original_language, poster_path
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
    sqlQuery = sqlQuery + 'AND production_countries LIKE ?'
    const productionCountryLike = `%${productionCountry}%`
    queryParams.push(productionCountryLike);
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
  const name = req.query.name ? `%${req.query.name}%` : '%';
  const role = req.query.role || 'all';
  const releaseDateStart = req.query.release_date_start || '1900-01-01';
  const releaseDateEnd = req.query.release_date_end || '2050-01-01';
  const runtimeMin = parseInt(req.query.runtime_min) || 0;
  const runtimeMax = parseInt(req.query.runtime_max) || 30000;
  const originalLanguage = req.query.original_language || 'all';

  // Construct the SQL query with dynamic filtering
  let sqlQuery = `
    WITH person_selected AS
      (
        SELECT n.name_id, n.primaryName, c.imdb_id, c.category
        FROM name n JOIN crew c ON n.name_id = c.name_id
        WHERE primaryName LIKE ?
        UNION
        SELECT n.name_id, n.primaryName, d.imdb_id, 'director' AS category
        FROM name n JOIN director d ON n.name_id = d.directors_id
        WHERE primaryName LIKE ?
        UNION
        SELECT n.name_id, n.primaryName, w.imdb_id, 'writer' AS category
        FROM name n JOIN writer w ON n.name_id = w.writers_id
        WHERE primaryName LIKE ?
      )
    SELECT m.imdb_id AS imdb_id, name_id, primaryName, category, title, production_countries, release_date, runtime, original_language 
    FROM person_selected p
    JOIN movie m ON m.imdb_id = p.imdb_id
    WHERE m.release_date BETWEEN ? AND ?
    AND m.runtime BETWEEN ? AND ?
  `;

  // Query parameters for the prepared statement
  const queryParams = [
    name, name, name,
    releaseDateStart, releaseDateEnd,
    runtimeMin, runtimeMax
  ];

  if (role !== 'all') {
    sqlQuery = sqlQuery + 'AND category = ?'
    queryParams.push(role);
  }

  if (originalLanguage !== 'all') {
    sqlQuery = sqlQuery + 'AND m.original_language = ?'
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

module.exports = {
  search_movies,
  search_persons,
}
