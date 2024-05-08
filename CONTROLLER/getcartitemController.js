exports.getcartitem = async (req,res)=>{
    try {
        const CartFood = require('../SCHEMAS/cartSchema');
        const cartItems = await CartFood.find({});
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error Fetching cart Items");
    }
}