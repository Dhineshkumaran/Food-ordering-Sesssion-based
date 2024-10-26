const express = require('express');
const addtocartController = require('../CONTROLLER/foodOrderController');
const authorizeSession = require('../UTILS/authorizeSession');

const router = express.Router();
router.route('/')
    .post(authorizeSession, addtocartController.addToCart)

module.exports = router;