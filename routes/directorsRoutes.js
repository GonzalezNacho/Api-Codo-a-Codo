const express = require('express');
const router = express.Router();
const directorsController = require('../controller/directorsController');
const {validarUserLogin, validarAdmin} = require('../utils/middleware');

router.get('/', directorsController.getAllDirectors);
router.get('/:id', directorsController.getDirectorById);
router.post('/', validarUserLogin, validarAdmin, directorsController.addDirector);
router.put('/:id', validarUserLogin, validarAdmin, directorsController.editDirector);
router.delete('/:id', validarUserLogin, validarAdmin, directorsController.deleteDirector);

module.exports = router;
