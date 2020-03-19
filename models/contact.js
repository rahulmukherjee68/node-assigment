const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email: String,
    phone: Number,
});

module.exports=mongoose.model('contact',contactSchema);