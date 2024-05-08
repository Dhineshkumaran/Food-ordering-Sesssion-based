exports.getorder = async (req,res)=>{
    try {
        const Order = require('../SCHEMAS/ordersSchema');
        if(req.query.id) {
            const id = req.query.id;
            let result = await Order.find({'orderNo':id});
            res.status(200).json(result);
        } else {
            let result = await Order.find();
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error displaying data.");
    }
}