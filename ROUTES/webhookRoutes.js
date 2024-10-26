const express = require('express');
const webhookController = require('../CONTROLLER/webhookController');

const router = express.Router();
router.route('/')
    .post(webhookController.webhook);

module.exports = router