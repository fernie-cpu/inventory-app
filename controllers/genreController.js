const Genre = require('../models/genre');
const Movie = require('../models/movie');

var async = require('async');

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genres) => {
      if (err) {
        return next(err);
      }
      // sucessful render
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list_genres,
      });
    });
};

exports.genre_detail = (req, res, next) => {
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_movies: (callback) => {
        Movie.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        let err = new Error('Genre not found');
        err.status = 404;
        return next(err);
      }
      res.render('genre_detail', {
        title: `${results.genre.name} Movies - Movies Collection`,
        genre: results.genre,
        genre_movies: results.genre_movies,
      });
    }
  );
};

exports.genre_create_get = (req, res) => {
  res.send('create genre get');
};

exports.genre_create_post = (req, res) => {
  res.send('create genre post');
};

exports.genre_delete_get = (req, res) => {
  res.send('delete genre get');
};

exports.genre_delete_post = (req, res) => {
  res.send('delete genre post');
};

exports.genre_update_get = (req, res) => {
  res.send('update genre get');
};

exports.genre_update_post = (req, res) => {
  res.send('update genre post');
};
