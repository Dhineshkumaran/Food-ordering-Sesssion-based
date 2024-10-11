const asyncErrorHandler = require('../UTILS/asyncErrorHandler');

exports.adminlogin = asyncErrorHandler(
    async (req, res)=>{
        const path = require('path');
        const fp = path.resolve('HTML','AdminLogin.html');
        res.setHeader('Content-Type','text/html');
        res.status(200).sendFile(fp);
    }
);