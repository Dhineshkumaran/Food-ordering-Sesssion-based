const express = require('express');
const verifyToken = require('../UTILS/verifyToken');
const getcartitemController = require('../CONTROLLER/getcartitemController');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(verifyToken, authorizeRoles('admin','user'), getcartitemController.getcartitem);

module.exports = router;