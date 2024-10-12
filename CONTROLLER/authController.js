const User = require('../SCHEMAS/UserSchema');
const asyncErrorHandler = require('../UTILS/asyncErrorHandler');
const customError = require('../UTILS/customError');
const jwt = require('jsonwebtoken');
const signToken = (id, role) => {
    return jwt.sign({id: id, role: role}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
}

exports.signup = asyncErrorHandler(
    async (req, res, next) =>{
        console.log(req.body);
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id, newUser.role);
        console.log(token);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: process.env.LOGIN_EXPIRES * 1000,
            sameSite: 'none',
            path: '/'
        })

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
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
        console.log(user);
        
        // const isMatch =  user.comparePasswordInDb(password, user.password);

        //check if the user exist & password matches
        if(!user || !(await user.comparePasswordInDb(password, user.password))){
            const error = new customError('Incorrect email or password', 400);
            return next(error);
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token: token
        });
    }
)