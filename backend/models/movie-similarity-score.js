const mongoose = require('mongoose');
const Movie = require('./movie');

// title1  title2   title_sim  genre_sim  director_sim  ...
// batMan superMan    1.2        0.8         1.7

const movieSimilaritySchema = mongoose.Schema({
  title1: {
    type: String,
    required: true,
    trim: true
  },
  title2: {
    type: String,
    required: true,
    trim: true
  },
  director_sim: {
    type: Number,
    required: true
  },
  actors_sim: {
    type: Number,
    required: true
  },
  genre_sim: {
    type: Number,
    required: true
  },
  keywords_sim: {
    type: Number,
    required: true
  }
});

movieSimilaritySchema.virtual('movies', {
  ref: 'Movie',
  localField: 'title2',
  foreignField: 'title',
  justOne: true
});
movieSimilaritySchema.set('toObject', { virtuals: true });
movieSimilaritySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Movie-similarity-score", movieSimilaritySchema)
