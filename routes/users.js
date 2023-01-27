const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController');

router.get('/profile', UserController.profile);
router.get('/sign_up', UserController.signUp);
router.get('/sign_in', UserController.signIn)
router.post('/create_account', UserController.createUser);
router.post('/log_in', UserController.logIn);

module.exports = router;
