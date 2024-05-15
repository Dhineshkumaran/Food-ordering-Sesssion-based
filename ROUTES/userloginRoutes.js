const express = require('express');
const userloginController = require('../CONTROLLER/userloginController');

const router = express.Router();
router.route('/userlogin')
    .get(userloginController.userlogin);

module.exports = router;