const express = require('express');
const foodOrderController = require('../CONTROLLER/foodOrderController');

const router = express.Router();
router.route('/home')
    .get(foodOrderController.foodOrder)
    .post(foodOrderController.addToCart)

module.exports = router;