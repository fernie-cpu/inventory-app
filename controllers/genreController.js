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

exports.genre_detail = (req, res) => {
  res.send('genre detail page: ' + req.params.id);
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
