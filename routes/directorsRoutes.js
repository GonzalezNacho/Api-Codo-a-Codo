const express = require('express');
const router = express.Router();
const directorsController = require('../controller/directorsController');
const middleware = require('../utils/middleware');

router.get('/', directorsController.getAllDirectors);
router.get('/:id', directorsController.getDirectorById);
router.post('/', middleware.validarUserLogin, directorsController.addDirector);
router.put('/:id', directorsController.editDirector);
router.delete('/:id', directorsController.deleteDirector);

module.exports = router;
