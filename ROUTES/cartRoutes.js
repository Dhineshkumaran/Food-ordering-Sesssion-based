const express = require('express');
const displayCartController = require('../CONTROLLER/cartController');

const router = express.Router();
router.route('/cart')
    .get(displayCartController.displayCart)

module.exports = router;