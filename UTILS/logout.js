module.exports = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });
    
    res.status(200).json({ message: 'Logged out successfully' });
};
