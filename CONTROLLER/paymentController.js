const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_4rdgre6savrrmw',
  key_secret: 'ChIfjFDQzArGvs9JD0eMGxLw'
});

// Endpoint to create a new order
exports.createorder = (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: req.body.receipt,
    payment_capture: req.body.payment_capture
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    } else {
      res.json(order);
    }
  });
};

