const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }, 
    email:{
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type:String,
        required: true,
        minLength: [8, "Password should be no less than 8 characters"],
        maxLength: [15, "Password should be shorter than 15 characters"]
    }, 
    }, {timestamp: true}
)


const User = mongoose.model('User', UserSchema);
module.exports = User;
