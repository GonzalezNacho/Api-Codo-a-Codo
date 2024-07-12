const express = require('express');
const router = express.Router();
const moviesController = require('../controller/moviesController');
const middleware = require('../utils/middleware');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);
router.post('/', moviesController.addMovie);
router.put('/:id', moviesController.editMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
