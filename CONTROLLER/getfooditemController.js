exports.getfooditems = async (req,res)=>{
    try {
        const FoodItem = require('../SCHEMAS/foodItemsSchema');
        const items = await FoodItem.find({});
        res.status(200).send(items);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error Fetching food Items");
    }
}
