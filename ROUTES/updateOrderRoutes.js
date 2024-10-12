const express = require('express');
const updateOrderController = require('../CONTROLLER/updateOrderController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .patch(verifyToken, authorizeRoles('admin'), updateOrderController.updateOrder)
    .post(verifyToken, authorizeRoles('admin' ,'user'), updateOrderController.createOrder)

module.exports = router;