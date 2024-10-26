module.exports = (req, res, next) => {
    if (!req.sessionID) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}