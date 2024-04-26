const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const routesInfo = require('./routesInfo');
const routesTop = require('./routesTop');
const routesSearch = require('./routesSearch');
const routesComment = require('./routesComment');
const routesLike = require('./routesLike');
const routesRecommend = require('./routesRecommend');

const app = express();
app.use(cors({
  origin: '*',
}));

// Follow https://create-react-app.dev/docs/deployment/ to deploy
app.use(express.static(path.join(__dirname, '../client/build')));

// Required to parse request body: https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
app.use(express.json());

/********************************
 * display page *
 ********************************/
//info
app.get('/movie/:movie_id', routesInfo.movie);
app.get('/person/:person_id', routesInfo.person,routesInfo.person_movies);

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

/********************************
 * Movie Recommend *
 ********************************/
app.get('/user/:user_id/movie_for_you', routesRecommend.recommendMovie);

/********************************
 * Director Recommend *
 ********************************/
app.get('/user/:user_id/director_for_you', routesRecommend.recommendDirector);

// Catch all non-API request and return the front end file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(config.server_port, () => {
  console.log(`Server running at http://${process.env.SERVER_HOST || config.server_host}:${config.server_port}/`)
});

module.exports = app;
