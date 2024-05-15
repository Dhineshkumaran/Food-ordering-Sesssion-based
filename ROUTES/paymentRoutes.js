const express = require('express');
const paymentController = require('../CONTROLLER/paymentController');

const router = express.Router();
router.route('/create-order')
    .post(paymentController.createorder);

module.exports = router