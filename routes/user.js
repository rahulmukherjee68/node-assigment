const express = require('express');
const router = express.Router();
const body = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


router.post('/', (req, res, next) => {
    var myobj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        dob: req.body.dob,
    };
    console.log(myobj);
    try{
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        else {
            var dbo = db.db("user");
            dbo.collection("users").insertOne(myobj, function(err, res) {
                if (err) throw err;
               
            });
        }
    });
    res.status(200).json({
        message:"Data Inserted Successfully"
    });

    }
    catch(error){
        res.status(404).json({
            message:error
        });
    }


});


router.get('/', (req, res, next) => {

    res.status(200).json({
        "message": "user works"
    });
});

module.exports = router;