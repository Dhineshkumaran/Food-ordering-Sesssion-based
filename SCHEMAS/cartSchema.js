const mongoose = require('mongoose');

const cartfoodSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    price: Number,
    quantity: Number
});

const CartFood = mongoose.model('cart_foods', cartfoodSchema);

module.exports = CartFood;
