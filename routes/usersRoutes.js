const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const middleware = require('../utils/middleware');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.put('/:id', usersController.editUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
