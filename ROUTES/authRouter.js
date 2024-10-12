const express = require('express');
const authController = require('../CONTROLLER/authController');
const verifyToken = require('../UTILS/verifyToken');

const router = express.Router();
router.route('/signup')
    .post(authController.signup);
router.route('/login')
    .post(verifyToken, authController.login);

module.exports = router;