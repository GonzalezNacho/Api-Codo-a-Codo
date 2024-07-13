const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController');
const {validarUserLogin, validarAdmin} = require('../utils/middleware');

router.get('/', validarUserLogin, commentsController.getAllComments);
router.get('/:id', validarUserLogin, commentsController.getCommentById);
router.post('/', validarUserLogin, commentsController.addComment);
router.put('/:id', validarUserLogin, commentsController.editComment);
router.delete('/:id', validarUserLogin, validarAdmin, commentsController.deleteComment);

module.exports = router;