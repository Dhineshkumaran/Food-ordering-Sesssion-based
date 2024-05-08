const mongoose = require('mongoose');
const foodItemSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    description: String,
    price: Number
});

const FoodItem = mongoose.model('food_items', foodItemSchema);

module.exports = FoodItem;
