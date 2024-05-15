const express = require('express');
const webhookController = require('../CONTROLLER/webhookController');

const router = express.Router();
router.route('/webhook')
    .post(webhookController.webhook);

module.exports = router