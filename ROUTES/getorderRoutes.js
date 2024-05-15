const express = require('express');
const getorderController = require('../CONTROLLER/getorderController')

const router = express.Router();
router.route('/getorder')
    .get(getorderController.getorder)

module.exports = router