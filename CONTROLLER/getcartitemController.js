const asyncErrorHandler = require('../UTILS/asyncErrorHandler');
const cartSchema = require('../SCHEMAS/cartSchema');

exports.getcartitem = asyncErrorHandler(
    async (req, res) => {
        const userId = req.sessionID;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const cartItems = await cartSchema.find({ userId: userId });
        res.status(200).json(cartItems);
    }
);
