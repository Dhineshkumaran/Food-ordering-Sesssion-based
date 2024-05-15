const express = require('express');
const getfooditemController = require('../CONTROLLER/getfooditemController');

const router = express.Router();
router.route('/getfooditems')
    .get(getfooditemController.getfooditems);

module.exports = router;