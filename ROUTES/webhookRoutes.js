const express = require('express');
const verifyToken = require('../UTILS/verifyToken');
const webhookController = require('../CONTROLLER/webhookController');

const router = express.Router();
router.route('/')
    .post(verifyToken, webhookController.webhook);

module.exports = router