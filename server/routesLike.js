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
 * Post Like *
 ************************/

const postLike = async function(req, res) {
  const movieId = req.params.movie_id;
  const body = req.body;
  const userId = body.user_id;
  const select = body.select;
  let queryString = ""

  if (select === "true" || select === true) {
    queryString = `INSERT INTO user_like(user_id, imdb_id)
    VALUES('${userId}', '${movieId}')`;
  } else {
    queryString = `DELETE FROM user_like WHERE user_id = '${userId}' AND imdb_id = '${movieId}'`;
  }

  connection.query(queryString, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({err: err});
    } else {
      res.json({});
    }
  });
}


/************************
 * Get Like *
 ************************/

const getLike = async function(req, res) {
  const movieId = req.params.movie_id;
  const userId = req.query.user_id;
  console.log(`Get like for movie ${movieId} and user ${userId}`);
  let queryString = `SELECT *
  FROM user_like
  WHERE user_id = '${userId}'
  AND imdb_id = '${movieId}';`;
  
  connection.query(queryString, (err, data) => {
      if (err || data.length === 0) {
        if (err) console.log(err);
        res.json({like: false});
      } else {
        res.json({like: true});
      }
  });
}

module.exports = {
  postLike,
  getLike
}
