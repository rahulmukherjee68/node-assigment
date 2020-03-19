const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    dob: Date
});

module.exports=mongoose.model('user',userSchema);