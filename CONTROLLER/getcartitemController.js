const asyncErrorHandler = require('../UTILS/asyncErrorHandler');

exports.getcartitem = asyncErrorHandler(
    async (req,res)=>{
        const CartFood = require('../SCHEMAS/cartSchema');
        const cartItems = await CartFood.find({});
        res.status(200).json(cartItems);
    }
);