const asyncErrorHandler = require('../UTILS/asyncErrorHandler');
const cartSchema = require('../SCHEMAS/cartSchema');
const { ObjectId } = require('mongodb');

exports.getcartitem = asyncErrorHandler(
    async (req, res) => {
        const userId = new ObjectId(req.user.id);

        const cartItems = await cartSchema.find({userId: userId});
        
        res.status(200).json(cartItems);
    }
);
