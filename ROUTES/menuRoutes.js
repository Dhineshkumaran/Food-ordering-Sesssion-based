const express = require('express');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');
const menuController = require('../CONTROLLER/menuController');

const router = express.Router();
router.route('/')
    .get(verifyToken, authorizeRoles('admin'), menuController.getMenu)
    .post(verifyToken, authorizeRoles('admin'), menuController.addItem)
router.route('/:id')
    .delete(verifyToken, authorizeRoles('admin'), menuController.deleteItem);


module.exports = router