const asyncErrorHandler = require('../UTILS/asyncErrorHandler');

exports.addItem = asyncErrorHandler(
    async (req,res)=>{
        const FoodItem = require('../SCHEMAS/foodItemsSchema');
        const foodItem = new FoodItem(req.body);
        await foodItem.save();
        res.status(200).send("Item added successfully");
    }
);

exports.deleteItem = asyncErrorHandler(
    async (req,res)=>{
        const FoodItem = require('../SCHEMAS/foodItemsSchema');
        const response = await FoodItem.deleteOne({_id:req.params.id});
        res.status(204).send("Item deleted successfully");
    }
);

exports.getMenu = asyncErrorHandler(
    async (req,res)=>{
        const path = require('path');
        const fp = path.resolve('HTML','Menu.html');
        res.setHeader('Content-Type','text/html')
        res.status(200).sendFile(fp);
    }
);