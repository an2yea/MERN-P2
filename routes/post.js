const express = require('express');

const router = express.Router();
const passport = require('passport');

const postController = require('../controller/postsController');


router.post('/create',passport.checkAuthentication, postController.createPost);
router.get('/delete_post/:id', postController.deletePost);

module.exports = router;