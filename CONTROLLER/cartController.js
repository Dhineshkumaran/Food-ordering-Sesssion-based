const asyncErrorHandler = require('../UTILS/asyncErrorHandler');

exports.displayCart = asyncErrorHandler(
    async (req, res) => {
        const path = require('path');
        res.setHeader('Content-Type', 'text/html');
        const fp = path.resolve('HTML','Cart.html');
        res.status(200).sendFile(fp);
    }
); 