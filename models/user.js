const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    dob: Date,
    contactRef:Object
});

module.exports=mongoose.model('user',userSchema);