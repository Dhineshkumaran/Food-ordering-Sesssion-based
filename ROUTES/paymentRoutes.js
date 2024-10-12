const express = require('express');
const paymentController = require('../CONTROLLER/paymentController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .post(verifyToken, authorizeRoles('admin','user'), paymentController.createorder);

module.exports = router