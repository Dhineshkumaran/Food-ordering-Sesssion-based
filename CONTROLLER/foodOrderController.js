const asyncErrorHandler = require('../UTILS/asyncErrorHandler');
const {ObjectId} = require('mongodb');
const customError = require('../UTILS/CustomError');

exports.foodOrder = asyncErrorHandler(
    async (req, res) => {
        const path = require('path');
        const fp = path.resolve('HTML','Food_ordering.html');
        res.setHeader('Content-Type','text/html')
        res.status(200).sendFile(fp);
    }
);

exports.addToCart = asyncErrorHandler(
    async (req, res, next) => {
        const CartFood = require('../SCHEMAS/cartSchema');
        const { name, imageURL, price } = req.body;
        if(!name || !imageURL || !price){
            const error = new customError('All fields are required while adding to cart. ', 400);
            return next(error);
        }
        let quantity = await CartFood.countDocuments({'userId': req.sessionID, 'name': name});
        if (quantity==0) {
            const addFoods = new CartFood({'userId': req.sessionID, 'name':name, 'imageURL':imageURL, 'price':price, 'quantity':1});
            await addFoods.save();
        } else {
            await CartFood.updateOne({'name':name}, {$inc:{'quantity':1}});
        }
        let cartItems = await CartFood.find();
        if(process.env.NODE_ENV == "development") {
            console.log(cartItems);
        }
        res.json({ success: true, message:"Item added to cart" });
    }
);
