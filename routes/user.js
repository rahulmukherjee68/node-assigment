const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');


// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/test";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
 
// make client connect to mongo service
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // db pointing to newdb
    console.log("Switched to "+db.databaseName+" database");
 
    // document to be inserted
    var doc = { name: "Roshan", age: "22" };
    
    // insert document to 'users' collection using insertOne
    db.collection("test").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});



router.get('/', (req, res, next) => {

    res.status(200).json({
        "message": "user works"
    });
});

module.exports=router;