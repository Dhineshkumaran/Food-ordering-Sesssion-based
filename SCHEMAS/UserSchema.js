const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: [true, "Firstname is required!"]
    },
    lastname : {
        type: String,
        required: [true, "Lastname is required!"]
    },
    username : {
        type: String,
        unique: true,
        required: [true, "Username is required!"],
        validate: [validator.isAlphanumeric, "Please enter a valid username!"]
    },
    password : {
        type: String,
        required: [true, "Password is required!"],
        validator: function(val){
            return /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(val)
        },
        message: "Password does not meet the criteria",
        select: false
    },
    confirmPassword : {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            validator: function(val){
                return val == this.password
            },
            message: "Password and confirmPassword does not match!"
        }
    },
    role: {
        type: String,
        required: [true, "Role is required!"]
    }
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    //encrypt the password before saving it
    //salt -> hash
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

UserSchema.methods.comparePasswordInDb = async function(password, passwordDb){
    return await bcrypt.compare(password, passwordDb);
}

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;