var express = require('express');
var router = express.Router();

const movie_controller = require('../controllers/movieController');
const genre_controller = require('../controllers/genreController');
const director_controller = require('../controllers/director_controller');

router.get('/', movie_controller.index);

router.get('/movie/create', movie_controller.movie_create_get);

router.post('/movie/create', movie_controller.movie_create_post);

router.get('/movie/:id/delete', movie_controller.movie_delete_get);

router.post('/movie/:id/delete', movie_controller.movie_delete_post);

router.get('/movie/:id/update', movie_controller.movie_update_get);

router.post('/movie/:id/update', movie_controller.movie_update_post);

router.get('/movie/:id', movie_controller.movie_detail);

router.get('/movies', movie_controller.movie_list);

//director

router.get('/director/create', director_controller.director_create_get);

router.post('/director/create', director_controller.director_create_post);

router.get('/director/:id/delele', director_controller.director_delete_get);

router.post('/director/:id/delete', director_controller.director_delete_post);

router.get('/director/:id/update', director_controller.director_update_get);

router.post('/director/:id/update', director_controller.director_update_post);

router.get('/director/:id', director_controller.director_detail);

router.get('/directors', director_controller.director_list);

// genre
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

router.get('/genres', genre_controller.genre_list);

module.exports = router;
