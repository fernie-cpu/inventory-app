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

exports.movie_list = (req, res, next) => {
  Movie.find({}, 'title director')
    .populate('director')
    .exec((err, list_movies) => {
      if (err) {
        return next(err);
      }
      res.render('movie_list', {
        title: 'Movies List',
        movie_list: list_movies,
      });
    });
};

exports.movie_detail = (req, res, next) => {
  async.parallel(
    {
      movie: (callback) => {
        Movie.findById(req.params.id)
          .populate('director')
          .populate('genre')
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.movie == null) {
        let err = new Error('Movie not found');
        err.status = 404;
        return next(err);
      }
      res.render('movie_detail', {
        title: `${results.movie.title} - Movies Collection`,
        movie: results.movie,
      });
    }
  );
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
