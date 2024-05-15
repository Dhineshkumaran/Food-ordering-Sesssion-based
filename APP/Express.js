const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');

const foodOrderRoutes = require('../ROUTES/foodOrderRoutes');
const addtocartRoutes = require('../ROUTES/addtocartRoutes');
const adminloginRoutes = require('../ROUTES/adminloginRoutes');
const orderRoutes = require('../ROUTES/orderRoutes')
const cartRoutes = require('../ROUTES/cartRoutes');
const displayOrderRoutes = require('../ROUTES/orderRoutes');
const getOrderRoutes = require('../ROUTES/getorderRoutes');
const signupRoutes = require('../ROUTES/signupRoutes');
const updateOrderRoutes = require('../ROUTES/updateOrderRoutes');
const userloginRoutes = require('../ROUTES/userloginRoutes');
const getcartitemRoutes = require('../ROUTES/getcartitemRoutes');
const getfooditemsRoutes = require('../ROUTES/getfooditemRoutes');
const paymentRoutes = require('../ROUTES/paymentRoutes');
const webhookRoutes = require('../ROUTES/webhookRoutes');
const authRouter = require('../ROUTES/authRouter');

const app = express();
app.use(express.static('CSS'));
app.use(express.static('SCRIPTS'));
app.use(express.static('FOOD-ORDERING'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose Connection
const {mongoose, connect } = require('../CONNECTION/Mongoose');

async function main() {
    try {
        await connect();
        console.log('Connected to the MongoDB server');

        app.use('/', foodOrderRoutes);

        app.use('/', foodOrderRoutes);

        app.use('/',addtocartRoutes);

        app.use('/',adminloginRoutes);

        app.use('/',cartRoutes);

        app.use('/', getOrderRoutes);

        app.use('/',orderRoutes);

        app.use('/',displayOrderRoutes);

        app.use('/',signupRoutes);

        app.use('/',updateOrderRoutes);

        app.use('/',userloginRoutes);

        app.use('/',getcartitemRoutes);

        app.use('/',getfooditemsRoutes);

        app.use('/',paymentRoutes);

        app.use('/',webhookRoutes);

        app.use('/', authRouter);

    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = app;

main();
