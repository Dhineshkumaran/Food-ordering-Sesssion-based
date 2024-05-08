const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String,
    confirmPassword : String
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;