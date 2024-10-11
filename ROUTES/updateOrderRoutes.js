const express = require('express');
const updateOrderController = require('../CONTROLLER/updateOrderController');

const router = express.Router();
router.route('/')
    .patch(updateOrderController.updateOrder)
    .post(updateOrderController.createOrder)

module.exports = router;