const asyncErrorHandler = require('../UTILS/asyncErrorHandler');

exports.getfooditems = asyncErrorHandler(
    async (req,res)=>{
        const FoodItem = require('../SCHEMAS/foodItemsSchema');
        const items = await FoodItem.find({});
        res.status(200).send(items);
    }    
);