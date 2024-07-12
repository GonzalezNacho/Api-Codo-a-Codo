const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const middleware = require('../utils/middleware');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addStandardUser);
router.post('/admin',middleware.validarUserLogin, usersController.addAdmin);
router.put('/:id', usersController.editUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
