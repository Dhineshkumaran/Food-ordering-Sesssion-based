const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const User = require('../SCHEMAS/UserSchema');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            console.error('No token found in cookies.');
            return res.status(401).redirect('/auth');
        }

        const decoded = jwt.verify(token, process.env.SECRET_STR);

        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            console.error('User not found for the given token.');
            return res.status(404).json({ message: 'User not found. Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {
            console.error('Token expired:', error.message);
            return res.status(401).redirect('/auth');
        }

        if (error instanceof jwt.JsonWebTokenError) {
            console.error('Invalid token:', error.message);
            return res.status(403).json({ message: 'Invalid token. Access forbidden.' });
        }

        console.error('Unexpected error during token verification:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
