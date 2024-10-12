const express = require('express');
const getOrderController = require('../CONTROLLER/orderController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(verifyToken, authorizeRoles('admin'), getOrderController.getOrder)

module.exports = router;