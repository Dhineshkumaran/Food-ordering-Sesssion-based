try {
    exports.getOrder = async (req,res)=>{
        const path = require('path');
        const Order = require('../SCHEMAS/ordersSchema');
        if(req.query.id) {
            const orderId=req.query.id;
            let result = await Order.find({orderNo:orderId});
            result = result[0];
            res.json(result);
            // console.log(result.foodItems);
        } else {               
            const fp = path.resolve('HTML','AdminDashboard.html');
            res.status(200).sendFile(fp);
        }
    }
} catch (error) {
    console.log('Error:',error);
    res.status(500).send("Error Fetching Orders");
}