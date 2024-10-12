const express = require('express');
const userloginController = require('../CONTROLLER/userloginController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(userloginController.userlogin);

module.exports = router;