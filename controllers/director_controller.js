const Director = require('../models/director');
const Movie = require('../models/movie');
const { body, validationResult } = require('express-validator');

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

exports.director_create_get = (req, res, next) => {
  res.render('director_form', { title: 'Create Director' });
};

exports.director_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body('date_of_death', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body('place_of_birth')
    .isLength({ min: 1 })
    .escape()
    .isAlphanumeric()
    .withMessage('Place of birth has non-alphanumeric characters'),
  body('place_of_death')
    .escape()
    .isAlphanumeric()
    .withMessage('Place of birth has non-alphanumeric characters')
    .optional({ checkFalsy: true }),
  body('birth_name').escape().optional({ checkFalsy: true }),
  body('mini_bio').escape().optional({ checkFalsy: true }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('director_form', {
        title: 'Create Director',
        director: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      let director = new Director({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
        place_of_birth: req.body.place_of_birth,
        place_of_death: req.body.place_of_death,
        birth_name: req.body.birth_name,
        mini_bio: req.body.mini_bio,
      });
      director.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(director.url);
      });
    }
  },
];

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
