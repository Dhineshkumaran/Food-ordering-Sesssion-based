const asyncErrorHandler = require('../UTILS/asyncErrorHandler');

exports.getorder = asyncErrorHandler(
    async (req,res)=>{
        const Order = require('../SCHEMAS/ordersSchema');
        if(req.query.id) {
            const id = req.query.id;
            let result = await Order.find({'orderNo':id});
            res.status(200).json(result);
        } else {
            let result = await Order.find();
            res.status(200).json(result);
        }
    }
);