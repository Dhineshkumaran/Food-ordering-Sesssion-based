const User = require('../SCHEMAS/UserSchema');
const asyncErrorHandler = require('../UTILS/asyncErrorHandler');
const customError = require('../UTILS/CustomError');
const jwt = require('jsonwebtoken');
const signToken = (id, role) => {
    return jwt.sign({id: id, role: role}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
}

exports.signup = asyncErrorHandler(
    async (req, res, next) =>{
        if(process.env.NODE_ENV == "development") {
            console.log(req.body);
        }
        const {firstname, lastname, username, password, confirmPassword} = req.body;
        let role = 'user';

        if(req.query.role === 'admin' && req.query.invite === process.env.LOGIN_INVITE){
            role = 'admin';
        }

        const newUser = await User.create({firstname, lastname, username, password, confirmPassword, role});

        if(process.env.NODE_ENV == "development") {
            console.log(token);
        }

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    }
);

exports.loginpage = asyncErrorHandler(
    async (req, res) => {
        const path = require('path');
        const fp = path.resolve('HTML','Login.html');
        res.setHeader('Content-Type','text/html')
        res.status(200).sendFile(fp);
    }
);

exports.login = asyncErrorHandler(
    async(req, res, next) => {
        const {username, password} = req.body;
        // console.log(req.body);

        if(!username || !password){
            const error = new customError('Please provide username and password for login!', 400);
            return next(error);
        }

        const user = await User.findOne({username:username}).select('password');
        if(process.env.NODE_ENV == "development") {
            console.log(user);
        }
        // const isMatch =  user.comparePasswordInDb(password, user.password);

        //check if the user exist & password matches
        if(!user || !(await user.comparePasswordInDb(password, user.password))){
            const error = new customError('Incorrect email or password', 400);
            return next(error);
        }

        const token = signToken(user._id, user.role);

        var currentDate = new Date();

        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)),
            path: '/'
        }).status(200).json({
            status: 'success',
            token: token
        });
    }
)