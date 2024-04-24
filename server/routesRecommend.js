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

const cache = {}

/************************
 * Movie Recommend *
 ************************/

const recommendMovie = async function(req, res) {
  const userId = req.params.user_id;

  let queryString = `WITH user_movies AS (SELECT m.imdb_id FROM movie m, user_like t WHERE m.imdb_id = t.imdb_id AND user_id = '${userId}'),
  favorite_directors AS ( SELECT d.directors_id FROM user_movies t, director d WHERE t.imdb_id = d.imdb_id ),
  all_movies_from_favorite_directors AS ( SELECT imdb_id FROM director f WHERE directors_id IN (SELECT * FROM favorite_directors) ),
  all_related_directors AS ( SELECT * FROM director g WHERE g.imdb_id IN (SELECT * FROM all_movies_from_favorite_directors) ),
  new_directors AS ( SELECT * FROM all_related_directors WHERE directors_id NOT IN (SELECT * FROM favorite_directors) ),
  favorite_writers AS ( SELECT DISTINCT w.writers_id FROM user_movies t, writer w WHERE t.imdb_id = w.imdb_id ),
  all_movies_from_favorite_writers AS ( SELECT imdb_id FROM writer w WHERE w.writers_id IN (SELECT * FROM favorite_writers) ),
  all_related_writers AS ( SELECT * FROM writer g WHERE g.imdb_id IN (SELECT * FROM all_movies_from_favorite_writers) ),
  new_writers AS ( SELECT * FROM all_related_writers WHERE writers_id NOT IN (SELECT * FROM favorite_writers) ),
  favorite_crew AS ( SELECT DISTINCT w.name_id FROM user_movies t, crew w WHERE t.imdb_id = w.imdb_id ),
  all_movies_from_favorite_crew AS ( SELECT imdb_id FROM crew w WHERE w.name_id IN (SELECT * FROM favorite_crew) ),
  all_related_crew AS ( SELECT * FROM crew g WHERE g.imdb_id IN (SELECT * FROM all_movies_from_favorite_crew) ),
  new_crew AS ( SELECT * FROM all_related_crew WHERE name_id NOT IN (SELECT * FROM favorite_crew) ),
  new_movies_based_on_director AS ( SELECT DISTINCT m.title, m.imdb_id, m.backdrop_path, m.overview, m.tagline, m.vote_average FROM movie m, new_directors n, director p WHERE m.vote_count > 100 AND m.imdb_id = p.imdb_id AND p.directors_id = n.directors_id ),
  new_movies_based_on_writers AS ( SELECT DISTINCT m.title, m.imdb_id, m.backdrop_path, m.overview, m.tagline, m.vote_average FROM movie m, new_writers n, writer p WHERE m.vote_count > 100 AND m.imdb_id = p.imdb_id AND p.writers_id = n.writers_id ),
  new_movies_based_on_crew AS ( SELECT DISTINCT m.title, m.imdb_id, m.backdrop_path, m.overview, m.tagline, m.vote_average FROM movie m, new_crew n, crew p WHERE m.vote_count > 100 AND m.imdb_id = p.imdb_id AND p.name_id = n.name_id )
  SELECT * FROM (SELECT * FROM (SELECT * FROM new_movies_based_on_director UNION SELECT * FROM new_movies_based_on_writers) AS temp UNION
  SELECT * FROM new_movies_based_on_crew) AS a WHERE a.backdrop_path IS NOT NULL AND a.imdb_id NOT IN (SELECT imdb_id FROM all_movies_from_favorite_directors) AND a.imdb_id NOT IN (SELECT imdb_id FROM all_movies_from_favorite_crew) AND a.imdb_id NOT IN (SELECT imdb_id FROM all_movies_from_favorite_writers)
  GROUP BY title, vote_average
  ORDER BY a.vote_average DESC
  LIMIT 10;`

  if (queryString in cache) {
    console.log("Found result from cache");
    return res.json(cache[queryString]);
  }

  connection.query(queryString, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      cache[queryString] = data;
      res.json(data);
    }
  });
}


/************************
 * Get Like *
 ************************/

const recommendDirector = async function(req, res) {
  const userId = req.params.user_id;

  let queryString = `WITH user_movies AS (SELECT imdb_id FROM user_like WHERE user_id = '${userId}'),
  favorite_directors AS ( SELECT d.directors_id FROM user_movies t, director d WHERE t.imdb_id = d.imdb_id ),
  all_movies_from_favorite_directors AS ( SELECT imdb_id FROM director f WHERE directors_id IN (SELECT * FROM favorite_directors) ),
  all_related_directors AS ( SELECT * FROM director g WHERE g.imdb_id IN (SELECT * FROM all_movies_from_favorite_directors) ),
  TOP_10_DIRECTORS AS (
     SELECT a.directors_id, AVG(m.vote_average) AS vote
     FROM all_related_directors a JOIN movie m on m.imdb_id = a.imdb_id
     WHERE m.vote_count > 1000 AND NOT EXISTS (SELECT f.directors_id FROM favorite_directors f WHERE a.directors_id = f.directors_id)
     GROUP BY a.directors_id
     ORDER BY AVG(m.vote_average) DESC
     LIMIT 10)
SELECT directors_id, vote, primaryName FROM TOP_10_DIRECTORS t JOIN name n ON t.directors_id = n.name_id;`

  if (queryString in cache) {
    console.log("Found result from cache");
    return res.json(cache[queryString]);
  }
  connection.query(queryString, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      cache[queryString] = data;
      res.json(data);
    }
  });
}

module.exports = {
  recommendMovie,
  recommendDirector
}
