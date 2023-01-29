const express = require('express');

const router = express.Router();

const postController = require('../controller/postsController');


router.post('/create_post', postController.createPost);


module.exports = router;