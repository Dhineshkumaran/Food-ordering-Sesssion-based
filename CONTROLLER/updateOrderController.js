exports.updateOrder = async (req, res) => {
    try {
        const Order = require('../SCHEMAS/ordersSchema');
        if (req.query.id) {
            const id = req.query.id;
            await Order.updateOne({ orderNo: id }, { $set: { status: "PAID" } });
        } else {
            const data = req.body;
            console.log(data);
            const highestOrder = await Order.findOne().sort({ orderNo: -1 });
            const orderNo = highestOrder ? highestOrder.orderNo + 1 : 1;

            const newOrder = new Order({
                "orderNo": orderNo,
                "foodItems": data,
                "status": "NOT PAID"
            });
            await newOrder.save();

            res.json({ success: true, data });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};     