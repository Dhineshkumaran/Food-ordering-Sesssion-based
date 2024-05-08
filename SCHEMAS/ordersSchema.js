const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    orderNo:Number,
    foodItems:[{
        name:String,
        quantity:Number,
        imageURL:String,
        price:Number
}],
    status:String
});
const Order = mongoose.model('order_details', orderSchema);
module.exports = Order;