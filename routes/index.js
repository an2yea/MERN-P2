const express = require('express');

const router = express.Router();

const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./post'));
router.use('/comments', require('./comments'))
// router.use('/comments', require('./comment'));


module.exports = router;