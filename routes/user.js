const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const body = require('body-parser');

const UserModel = require('../models/user');
const ContactModel = require('../models/contact');


function ValidateEmail(mail) {
    //console.log(mail);

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function phonenumber(a) {
    a = a.toString();
    //console.log(a);

    if (a == "" || isNaN(a)) {
        return false;
    }
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if ((a.match(phoneno))) {
        return true;
    }
    else {
        return false;
    }
}

function saveContact(myobj, res) {
    const contact = new ContactModel({ _id: new mongoose.Types.ObjectId(), email: myobj.email, phone: myobj.phone });
    contact.save().then(result => {
        myobj = Object.assign({ contactRef: result._id }, myobj)
        console.log(myobj);
        saveUser(myobj, res);


    }).catch(err => {
        res.status(404).json({
            message: "Data Not Inserted Successfully " + err
        });
    });
}

function saveUser(myobj, res) {
    console.log(myobj);
    const user = new UserModel(myobj)

    user.save().then(result => {
        res.status(200).json({
            message: "Data Inserted Successfully to User Collection"
        });

    }).catch(err => {
        res.status(404).json({
            message: "Data Not Inserted Successfully " + err
        });
    });

}


async function insert(myobj, res) {
    UserModel.findOne({ email: myobj.email })
        .exec()
        .then(doc => {
            //console.log(doc);
            if (doc == null) {
                UserModel.findOne({ phone: myobj.phone }).exec().then(
                    doc => {
                        if (doc == null) {
                            saveContact(myobj, res);

                        }
                        else {
                            res.status(200).json({ message: "Duplicate phone number cannot be used" })
                        }
                    }
                )

            }
            else {
                res.status(200).json({ message: "Duplicate Email cannot be used" })
            }
        }).catch(err => {
            res.status(404).json({ message: err })
        })
}

router.post('/', (req, res, next) => {
    try {
        var myobj = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            dob: req.body.dob
        };

        if (ValidateEmail(myobj.email)) {
            if (phonenumber(myobj.phone)) {
                insert(myobj, res);
            }
            else {
                res.status(200).json({
                    message: "Mobile number not valid please Enter Valid Mobile bumber"
                });
            }
        }
        else {
            res.status(200).json({
                message: "Email Id not Valid please Enter Valid Email ID"
            });
        }

    }
    catch (error) {
        res.status(404).json({
            message: "Error:- " + error
        });
    }

});

function deleteAll(myobj, res) {
    UserModel.deleteOne(myobj).then(result => {
        ContactModel.deleteOne(myobj).then(result => {
            if(result.deletedCount==0)
            {
                res.status(200).json({
                    message: "No Data Found on the given Phone Number"
                });
            }
            else{
            res.status(200).json({
                message: "Data deleted Successfully from user and contacts "
            });
            }
        }).catch(err => {
            res.status(404).json({
                message: "Data Not deleted Successfully from user and contacts " + err
            });
        });

    }).catch(err => {
        res.status(404).json({
            message: "Data Not Inserted Successfully " + err
        });
    });



}

router.delete('/', (req, res, next) => {
    var myobj = {
        phone: req.body.phone,
    };
    if (phonenumber(myobj.phone)) {
        deleteAll(myobj, res)
    }
    else {
        res.status(200).json({
            message: "Mobile number not valid please Enter Valid Mobile bumber"
        });
    }
})

module.exports = router;