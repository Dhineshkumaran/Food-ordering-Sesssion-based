const asyncErrorHandler = require('../UTILS/asyncErrorHandler');
const customError = require('../UTILS/customError');
const Order = require('../SCHEMAS/ordersSchema');
const {ObjectId} = require('mongodb');

exports.updateOrder = asyncErrorHandler(
    async (req, res, next) => {
        const Order = require('../SCHEMAS/ordersSchema');
        const id = req.query.id;
        const response = await Order.updateOne({ orderNo: id }, { $set: { status: "PAID" } });
        if(response.matchedCount != 1) {
            const err = new customError(`Order with id:${req.query.id} not found.`, 404);
            next(err);
        } else {
            res.status(200).json({ success: true, message:"Order updated successfully."});
        }
    }
);     

exports.createOrder = asyncErrorHandler(
    async (req, res, next) => {
        const data = req.body;
        console.log(data);
        if (!data || data.length === 0) {
            const err = new customError("Order data is required", 400);
            return next(err);
        }
        const highestOrder = await Order.findOne().sort({ orderNo: -1 });
        const orderNo = highestOrder ? highestOrder.orderNo + 1 : 1;

        const newOrder = new Order({
            "orderId": req.sessionID,
            "orderNo": orderNo,
            "foodItems": data,
            "status": "NOT PAID"
        });
        await newOrder.save();

        res.status(201).json({ success: true, message:"Order created successfully." });
    }
)
