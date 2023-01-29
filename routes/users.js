const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controller/userController');

router.get('/profile', UserController.profile);
router.get('/sign_up', UserController.signUp);
router.get('/sign_in', UserController.signIn)

router.post('/create_account', UserController.createUser);
// router.post('/log_in', UserController.logIn);

//Use passport as middleware
router.post('/log_in',passport.authenticate(
    'local',
    {failureRedirect:' users/sign_in'},
), UserController.logIn)


router.get('/sign_out', UserController.destroySession);
module.exports = router;
