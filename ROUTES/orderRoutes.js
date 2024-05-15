const express = require('express');
const getOrderController = require('../CONTROLLER/orderController');

const router = express.Router();
router.route('/order')
    .get(getOrderController.getOrder)

module.exports = router;