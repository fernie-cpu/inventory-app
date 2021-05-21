const Movie = require('../models/movie');
const Director = require('../models/director');
const Genre = require('../models/genre');

var async = require('async');

exports.index = (req, res) => {
  async.parallel(
    {
      movie_count: (callback) => {
        Movie.countDocuments({}, callback);
      },
      director_count: (callback) => {
        Director.countDocuments({}, callback);
      },
      genre_count: (callback) => {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render('index', {
        title: 'Movies Collection',
        error: err,
        data: results,
      });
    }
  );
};

exports.movie_list = (req, res) => {
  res.send('Movie list');
};

exports.movie_detail = (req, res) => {
  res.send('movie detail page: ' + req.params.id);
};

exports.movie_create_get = (req, res) => {
  res.send('create movie get');
};

exports.movie_create_post = (req, res) => {
  res.send('create movie post');
};

exports.movie_delete_get = (req, res) => {
  res.send('create movie get');
};

exports.movie_delete_post = (req, res) => {
  res.send('create movie post');
};

exports.movie_update_get = (req, res) => {
  res.send('create movie get');
};

exports.movie_update_post = (req, res) => {
  res.send('create movie post');
};
