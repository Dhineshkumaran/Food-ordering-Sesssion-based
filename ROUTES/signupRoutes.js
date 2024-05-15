const express = require('express');
const signupController = require('../CONTROLLER/signupController');

const router = express.Router();
router.route('/signup')
    .get(signupController.signup)

module.exports = router;