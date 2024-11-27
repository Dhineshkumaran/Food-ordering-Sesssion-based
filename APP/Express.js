const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const foodOrderRoutes = require('../ROUTES/foodOrderRoutes');
const authRouter = require('../ROUTES/authRouter');
const addtocartRoutes = require('../ROUTES/addtocartRoutes');
const orderRoutes = require('../ROUTES/orderRoutes')
const cartRoutes = require('../ROUTES/cartRoutes');
const displayOrderRoutes = require('../ROUTES/orderRoutes');
const getOrderRoutes = require('../ROUTES/getorderRoutes');
const updateOrderRoutes = require('../ROUTES/updateOrderRoutes');
const menuRoutes = require('../ROUTES/menuRoutes');
const getcartitemRoutes = require('../ROUTES/getcartitemRoutes');
const getfooditemsRoutes = require('../ROUTES/getfooditemRoutes');
const paymentRoutes = require('../ROUTES/paymentRoutes');
const webhookRoutes = require('../ROUTES/webhookRoutes');
const logout = require('../UTILS/logout');

const CustomError = require('../UTILS/CustomError');
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
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}));


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

app.use(
    session({
        secret: process.env.SECRET_STR,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: process.env.CONN_STR,
          collectionName: 'sessions',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
        },
    })      
);

app.use((req, res, next) => {
    console.log(req.sessionID);
    next();
});



app.use('/', foodOrderRoutes);

app.use('/add-to-cart',addtocartRoutes);

app.use('/cart',cartRoutes);

app.use('/getorder', getOrderRoutes);

app.use('/order',orderRoutes);

app.use('/menu', menuRoutes);

app.use('/order',displayOrderRoutes);

app.use('/updateorder',updateOrderRoutes);

app.use('/getcartitems',getcartitemRoutes);

app.use('/auth', authRouter);

app.use('/getfooditems',getfooditemsRoutes);

app.use('/create-order',paymentRoutes);

app.use('/webhook',webhookRoutes);

app.use('/logout', logout);

app.all('*', (req, res, next)=>{
    const err = new CustomError(`Can't find the ${req.originalUrl} on the server!`, 404);
    next(err);
})

app.use(globalErrorHandler);

module.exports = app;

main();
