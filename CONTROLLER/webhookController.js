const crypto = require('crypto');
const webhookSecret = 'Dhinesh123#';
const Order = require('../SCHEMAS/ordersSchema');

// Endpoint to handle webhook events
exports.webhook = (req, res) => {
    const razorpaySignature = req.headers['x-razorpay-signature'];
    const event = req.body;
  
    const hmac = crypto.createHmac('sha256', webhookSecret);
    hmac.update(JSON.stringify(req.body));
    const calculatedSignature = hmac.digest('hex');
  
    if (calculatedSignature === razorpaySignature) {
      console.log('Webhook event received:', event);

      const id = Order.countDocuments();
      
      if(event.event === 'payment.captured') {
        Order.updateOne({ orderNo: id }, { $set: { status: "PAID" } });
      }
      
      res.status(200).send('Webhook received successfully.');
    } else {
      console.error('Invalid webhook signature.');
      res.status(400).send('Invalid webhook signature.');
    }
};