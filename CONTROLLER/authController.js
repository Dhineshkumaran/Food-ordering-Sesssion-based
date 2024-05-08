const User = require('../SCHEMAS/UserSchema');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) =>{
   try {
    const newUser = await User.create(req.body);
    
    //header | payload | secretstring
    const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user:newUser
        }
    })   

   } catch(error) {
    console.log(error);
   }
}

exports.login = async (req, res, next) =>{
    const {username, password} = req.body;

    try {
        if(!username || !password) {
            throw new Error('Please enter valid credentials!');
        }
    } catch (error) {
        console.log(error);
    }

    const user = await User.findOne({username}).select('password');

    res.status(200).json({
        status: 'success',
        token: '',
        user
    })
}