const express = require('express');
const getorderController = require('../CONTROLLER/getorderController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(verifyToken, authorizeRoles('admin'), getorderController.getorder)

module.exports = router