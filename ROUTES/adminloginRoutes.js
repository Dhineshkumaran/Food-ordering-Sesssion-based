const express = require('express');
const adminloginController = require('../CONTROLLER/adminloginController');

const router = express.Router();
router.route('/')
    .get(adminloginController.adminlogin)

module.exports = router;