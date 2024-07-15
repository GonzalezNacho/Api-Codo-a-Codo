const express = require('express');
const router = express.Router();
const moviesController = require('../controller/moviesController');
const {validarUserLogin, validarAdmin,validarMovies} = require('../utils/middleware');

router.get('/',validarMovies, moviesController.getAllMovies);
router.get('/:id',validarMovies, moviesController.getMovieById);
router.post('/',validarUserLogin, validarAdmin, moviesController.addMovie);
router.put('/:id', validarUserLogin, validarAdmin, moviesController.editMovie);
router.delete('/:id', validarUserLogin, validarAdmin, moviesController.deleteMovie);

module.exports = router;
