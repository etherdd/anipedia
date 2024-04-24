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

  let sqlQuery = '';
  let queryParams = [];

  // Construct the SQL query with dynamic filtering
  let sqlQueryCrew = `
  SELECT n.name_id, n.primaryName, m.imdb_id, category, m.title, m.original_language, m.release_date, m.runtime
    FROM name n
    JOIN crew c ON n.name_id = c.name_id
    JOIN movie m ON m.imdb_id = c.imdb_id
    WHERE n.primaryName LIKE ?
    AND m.release_date BETWEEN ? AND ?
    AND m.runtime BETWEEN ? AND ?
  `;

  // Query parameters for the prepared statement
  const queryParamsCrew = [
    name,
    releaseDateStart, releaseDateEnd,
    runtimeMin, runtimeMax
  ];

  let sqlQueryDirector = `
  SELECT n.name_id, n.primaryName, m.imdb_id, 'director' AS category, m.title, m.original_language, m.release_date, m.runtime
  FROM name n
  JOIN director d ON n.name_id = d.directors_id
  JOIN movie m ON m.imdb_id = d.imdb_id
  WHERE n.primaryName LIKE ?
  AND m.release_date BETWEEN ? AND ?
  AND m.runtime BETWEEN ? AND ?
  `;
  // Query parameters for the prepared statement
  const queryParamsDirector = [
    name,
    releaseDateStart, releaseDateEnd,
    runtimeMin, runtimeMax
  ];
  
  let sqlQueryWriter = `
  SELECT n.name_id, n.primaryName, m.imdb_id, 'writer' AS category, m.title, m.original_language, m.release_date, m.runtime
  FROM name n
  JOIN writer w ON n.name_id = w.writers_id
  JOIN movie m ON m.imdb_id = w.imdb_id
  WHERE n.primaryName LIKE ?
  AND m.release_date BETWEEN ? AND ?
  AND m.runtime BETWEEN ? AND ?
  `;

  // Query parameters for the prepared statement
  const queryParamsWriter = [
    name,
    releaseDateStart, releaseDateEnd,
    runtimeMin, runtimeMax
  ];

  if (originalLanguage !== 'all') {
    sqlQueryCrew = sqlQueryCrew + 'AND m.original_language = ?';
    sqlQueryDirector = sqlQueryDirector + 'AND m.original_language = ?';
    sqlQueryWriter = sqlQueryWriter + 'AND m.original_language = ?';
    queryParamsCrew.push(originalLanguage);
    queryParamsDirector.push(originalLanguage);
    queryParamsWriter.push(originalLanguage);
  }

  if ( role === 'director') {
    sqlQuery = sqlQueryDirector;
    queryParams = [...queryParamsDirector];
  } else if ( role === 'writer' ) {
    sqlQuery = sqlQueryWriter;
    queryParams = [...queryParamsWriter];
  } else if ( role !== 'all' ) {
    sqlQueryCrew = sqlQueryCrew + 'AND category = ?'
    queryParamsCrew.push(role);
    sqlQuery = sqlQueryCrew;
    queryParams = [...queryParamsCrew];
  } else {
    sqlQuery = '(' + 
                sqlQueryCrew + ')UNION ALL (' + 
                sqlQueryDirector + ')UNION ALL (' + 
                sqlQueryWriter + ') ORDER BY primaryName';
    queryParams = [...queryParamsCrew, ...queryParamsDirector, ...queryParamsWriter]
  };

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
