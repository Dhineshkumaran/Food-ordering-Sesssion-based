const express = require('express');
const getfooditemController = require('../CONTROLLER/getfooditemController');
const verifyToken = require('../UTILS/verifyToken');
const authorizeRoles = require('../UTILS/authorizeRoles');

const router = express.Router();
router.route('/')
    .get(verifyToken, authorizeRoles('admin','user'), getfooditemController.getfooditems);

module.exports = router;