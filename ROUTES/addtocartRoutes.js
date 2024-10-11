const express = require('express');
const addtocartController = require('../CONTROLLER/foodOrderController');

const router = express.Router();
router.route('/')
    .post(addtocartController.addToCart)

module.exports = router;