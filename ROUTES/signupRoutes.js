const express = require('express');
const signupController = require('../CONTROLLER/signupController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(signupController.signup)

module.exports = router;