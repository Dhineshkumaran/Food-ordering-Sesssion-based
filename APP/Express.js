const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const foodOrderRoutes = require('../ROUTES/foodOrderRoutes');
const addtocartRoutes = require('../ROUTES/addtocartRoutes');
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
const logout = require('../UTILS/logout');

const CustomError = require('../UTILS/customError');
const globalErrorHandler = require('../CONTROLLER/globalErrorHandler');

const app = express();
app.use(express.static('CSS'));
app.use(express.static('SCRIPTS'));
app.use(express.static('FOOD-ORDERING'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // Must match the frontend origin
    res.header('Access-Control-Allow-Credentials', 'true');  // Allow credentials to be sent
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Mongoose Connection
const {mongoose, connect } = require('../CONNECTION/Mongoose');

async function main() {
    try {
        await connect();
        console.log('Connected to the MongoDB server');
    } catch (error) {
        console.error('Error:', error);
    }
}

app.use('/home', foodOrderRoutes);

app.use('/add-to-cart',addtocartRoutes);

app.use('/cart',cartRoutes);

app.use('/getorder', getOrderRoutes);

app.use('/order',orderRoutes);

app.use('/order',displayOrderRoutes);

app.use('/signup',signupRoutes);

app.use('/updateorder',updateOrderRoutes);

app.use('/',userloginRoutes);

app.use('/getcartitems',getcartitemRoutes);

app.use('/getfooditems',getfooditemsRoutes);

app.use('/create-order',paymentRoutes);

app.use('/webhook',webhookRoutes);

app.use('/auth', authRouter);

app.use('/logout', logout);

app.all('*', (req, res, next)=>{
    const err = new CustomError(`Can't find the ${req.originalUrl} on the server!`, 404);
    next(err);
})

app.use(globalErrorHandler);

module.exports = app;

main();
