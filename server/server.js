const express = require('express');
const cors = require('cors');
const config = require('./config');
const routesInfo = require('./routesInfo');
const routesTop = require('./routesTop');
const routesSearch = require('./routesSearch');


const app = express();
app.use(cors({
  origin: '*',
}));


/********************************
 * display page *
 ********************************/
//info
app.get('/movie/:movie_id', routesInfo.movie);
app.get('/person/:person_id', routesInfo.person);
//movies from the chosen person
//app.get('/person_moives/:person_id', routesInfo.person_movies);
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
//app.get('/search_personss', routesSearch.search_persons);
//TO BE ADDED


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
