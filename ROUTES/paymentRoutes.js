const express = require('express');
const paymentController = require('../CONTROLLER/paymentController');

const router = express.Router();
router.route('/')
    .post(paymentController.createorder);

module.exports = router