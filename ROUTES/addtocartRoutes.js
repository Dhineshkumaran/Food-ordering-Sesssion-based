const express = require('express');
const addtocartController = require('../CONTROLLER/foodOrderController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .post(verifyToken, authorizeRoles('admin','user'), addtocartController.addToCart)

module.exports = router;