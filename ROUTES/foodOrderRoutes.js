const express = require('express');
const foodOrderController = require('../CONTROLLER/foodOrderController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(foodOrderController.foodOrder)
    .post(verifyToken, authorizeRoles('admin','user'), foodOrderController.addToCart)

module.exports = router;