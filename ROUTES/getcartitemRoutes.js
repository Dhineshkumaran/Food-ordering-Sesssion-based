const express = require('express');
const getcartitemController = require('../CONTROLLER/getcartitemController');

const router = express.Router();
router.route('/getcartitems')
    .get(getcartitemController.getcartitem);

module.exports = router;