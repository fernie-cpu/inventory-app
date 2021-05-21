const Director = require('../models/director');
const Movie = require('../models/movie');

var async = require('async');

exports.director_list = (req, res, next) => {
  Director.find()
    .sort([['first_name', 'ascending']])
    .exec((err, list_directors) => {
      if (err) {
        return next(err);
      }
      res.render('director_list', {
        title: 'Directors',
        director_list: list_directors,
      });
    });
};

exports.director_detail = (req, res, next) => {
  async.parallel(
    {
      director: (callback) => {
        Director.findById(req.params.id).exec(callback);
      },
      director_movies: (callback) => {
        Movie.find({ director: req.params.id }, 'title synopsis').exec(
          callback
        );
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.director == null) {
        let err = new Error('Director not found');
        err.status = 404;
        return next(err);
      }
      res.render('director_detail', {
        title: `${results.director.name} - Movie Collection`,
        director: results.director,
        director_movies: results.director_movies,
      });
    }
  );
};

exports.director_create_get = (req, res) => {
  res.send('create director get');
};

exports.director_create_post = (req, res) => {
  res.send('create director post');
};

exports.director_delete_get = (req, res) => {
  res.send('delete director get');
};

exports.director_delete_post = (req, res) => {
  res.send('delete director post');
};

exports.director_update_get = (req, res) => {
  res.send('update director get');
};

exports.director_update_post = (req, res) => {
  res.send('update director post');
};
