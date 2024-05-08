const express = require('express');
const updateOrderController = require('../CONTROLLER/updateOrderController');

const router = express.Router();
router.route('/')
    .post(updateOrderController.updateOrder)

module.exports = router;