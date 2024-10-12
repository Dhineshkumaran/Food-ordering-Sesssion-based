const express = require('express');
const displayCartController = require('../CONTROLLER/cartController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(verifyToken, authorizeRoles('admin','user'), displayCartController.displayCart)

module.exports = router;