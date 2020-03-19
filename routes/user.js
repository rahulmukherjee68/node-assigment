const express = require('express');
const router = express.Router();
const body = require('body-parser');

const UserModel = require('../models/user');


function ValidateEmail(mail) {
    console.log(mail);

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function phonenumber(a) {
    console.log(a);

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

function response(myobj, res) {
    const user = new UserModel(myobj)
    user.save().then(result => {
        console.log(result);

    }).catch(err => {
        res.status(404).json({
            message: "Data NOt Inserted Successfully" + err
        });
    });

    res.status(200).json({
        message: "Data Inserted Successfully"
    });
}


function insert(myobj, res) {
    UserModel.findOne({ email: myobj.email })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc == null) {
                UserModel.findOne({ phone: myobj.phone }).exec().then(
                    doc => {
                        if (doc == null) {
                            response(myobj, res);
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
            res.status(404).json({
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



router.get('/', (req, res, next) => {

    res.status(200).json({
        "message": "user works"
    });
});

module.exports = router;