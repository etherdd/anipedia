const express = require('express');
const cors = require('cors');
const config = require('./config');
const routesInfo = require('./routesInfo');
const routesTop = require('./routesTop');
const routesSearch = require('./routesSearch');
const routesComment = require('./routesComment');
const routesLike = require('./routesLike');

const app = express();
app.use(cors({
  origin: '*',
}));

// Required to parse request body: https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
app.use(express.json());

/********************************
 * display page *
 ********************************/
//info
app.get('/movie/:movie_id', routesInfo.movie);
app.get('/person/:person_id', routesInfo.person,routesInfo.person_movies);
// app.get('/person/:person_id', routesInfo.person_movies);
//movies from the chosen person
// app.get('/person_movies/:person_id', routesInfo.person_movies);
//TO BE ADDED

/********************************
 * top 10 *
 ********************************/
app.get('/top_movies', routesTop.movies);
app.get('/top_persons', routesTop.persons);
//TO BE ADDED

/********************************
 * search *
 ********************************/
app.get('/search_movies', routesSearch.search_movies);
app.get('/search_persons', routesSearch.search_persons);

/********************************
 * comments *
 ********************************/
app.post('/movie/:movie_id/comment', routesComment.postComment);
app.get('/movie/:movie_id/comment', routesComment.getComment);

/********************************
 * like *
 ********************************/
app.post('/movie/:movie_id/like', routesLike.postLike);
app.get('/movie/:movie_id/like', routesLike.getLike);


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
