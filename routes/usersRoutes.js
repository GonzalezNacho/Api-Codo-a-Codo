const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const {validarUserLogin, validarAdmin} = require('../utils/middleware');

router.get('/', validarUserLogin, usersController.getAllUsers);
router.get('/:id', validarUserLogin, usersController.getUserById);
router.post('/', usersController.addStandardUser);
router.post('/admin', validarUserLogin, validarAdmin, usersController.addAdmin);
router.put('/:id', validarUserLogin, usersController.editUser);
router.delete('/:id', validarUserLogin, validarAdmin, usersController.deleteUser);

module.exports = router;
