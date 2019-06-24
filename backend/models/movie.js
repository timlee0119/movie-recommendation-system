const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genres: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    require: true,
  },
  overview: {
    type: String,
    required: true
  },
  vote_average: {
    type: Number,
    required: true
  },
  vote_count: {
    type: Number,
    required: true
  },
  director_avg: {
    type: String,
    required: true
  },
  actors_avg: {
    type: String,
    required: true
  },
  genre_avg: {
    type: String,
    required: true
  },
  keywords_avg: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Movie", movieSchema);
