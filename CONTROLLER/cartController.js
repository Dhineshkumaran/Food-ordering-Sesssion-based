exports.displayCart = async (req, res) => {
    const path = require('path');
    try {
        res.setHeader('Content-Type', 'text/html');
        const fp = path.resolve('HTML','Cart.html');
        res.status(200).sendFile(fp);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}; 