const express = require('express');
const authController = require('../CONTROLLER/authController');
const verifyToken = require('../UTILS/verifyToken');

const router = express.Router();
router.route('/')
    .get(authController.loginpage);
router.route('/signup')
    .post(authController.signup);
router.route('/login')
    .post(authController.login);

module.exports = router;