const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const customError = require('../UTILS/CustomError');
const User = require('../SCHEMAS/UserSchema');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Token is: " + token);
        

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_STR);

        console.log(decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found. Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid token. Access forbidden.' });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    }
};
