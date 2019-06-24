const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Movie = require('../models/movie');
const MovieSimilarity = require('../models/movie-similarity-score');

// GET /movie/avatar
router.get('/movie/:title', async (req, res) => {
  try {
    const movies = await Movie.find({
      title: new RegExp('\\b' + req.params.title + '\\b', 'i')
    });
    res.status(200).send(movies);
  } catch (error) {
    res.status(404).send();
  }
});

// GET /movieId/:id
router.get('/movieId/:id', async (req, res) => {
  try {
    // console.log(req.params.id);
    const movie = await Movie.findById(req.params.id);
    // console.log(movie);
    res.status(200).send(movie);
  } catch (error) {
    res.status(404).send();
  }
});

// GET /recommend/:title
router.get('/recommend/:title', auth, async (req, res) => {
  try {
    const movie_list = await MovieSimilarity.find({
      title1: req.params.title
    }).populate('movies').exec();

    // get user parameters
    const { a, b, c, d } = await User.findById(req.user._id);

    // calculate score, delete title1, rename title 2 to title
    const top10_movie = movie_list.map((m) => {
      m = m.toObject();
      const score = a * m.director_sim +
                    b * m.actors_sim + 
                    c * m.genre_sim +
                    d * m.keywords_sim;
      const ret = {
        ...m.movies,
        score
      };
      return ret;
    }).sort((a, b) => {
      return b.score - a.score;
    }).slice(0,10);;

    res.status(200).send(top10_movie);
  } catch (error) {
    res.status(404).send();
  }
});

const myDivide = (a, b) => {
  return b == 0 ? 0 : a / b;
}
// POST /update/params
router.post('/update/params', auth, async (req, res) => {
  try {
    const { title1, title2 } = req.body;
    const movie_sim = await MovieSimilarity.findOne({
      title1,
      title2
    });
    const prev_movie = await Movie.findOne({title: title1});

    const delta_a = Math.sqrt(myDivide(movie_sim.director_sim, prev_movie.director_avg));
    const delta_b = Math.sqrt(myDivide(movie_sim.actors_sim, prev_movie.actors_avg));
    const delta_c = Math.sqrt(myDivide(movie_sim.genre_sim, prev_movie.genre_avg));
    const delta_d = Math.sqrt(myDivide(movie_sim.keywords_sim, prev_movie.keywords_avg));
    let new_params = [
      req.user.a + 5 * delta_a,
      req.user.b + 5 * delta_b,
      req.user.c + 5 * delta_c,
      req.user.d + 5 * delta_d
    ];
    let sum = 0;
    new_params.forEach((n) => {
      sum += n;
    });
    new_params.forEach((n, i) => {
      new_params[i] = new_params[i] * 300 / sum;
    });
    await req.user.update({
      a: new_params[0],
      b: new_params[1],
      c: new_params[2],
      d: new_params[3]
    });

    res.status(200).send();
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
