const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController');
const middleware = require('../utils/middleware');

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.addComment);
router.put('/:id', commentsController.editComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;