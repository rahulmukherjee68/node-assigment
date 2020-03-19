const express = require('express');
const mongoose = require("mongoose");

const { check, validationResult } = require('express-validator');


const router = express.Router();
const body = require('body-parser');

const UserModel = require('../models/user');
const ContactModel = require('../models/contact');



async function saveContact(myobj, res) {
    const contact = new ContactModel({ _id: new mongoose.Types.ObjectId(), email: myobj.email, phone: myobj.phone });
    const saveContact=await contact.save().then(result => {
        myobj = Object.assign({ contactRef: result._id }, myobj)
        return true;

    }).catch(err => {
        res.status(404).json({
            message: "Data Not Inserted Successfully " + err
        });
    });

    if(saveContact)
    {
        saveUser(myobj, res);
    }
}

function saveUser(myobj, res) {
    // console.log(myobj);
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
    const mail=await UserModel.findOne({ email: myobj.email }).then(doc=>{
        return doc
    }).catch(err => { res.status(422).json({ message: err }) });

    if(mail==null)
    {
        const mob=await UserModel.findOne({ phone: myobj.phone }).then(doc=>{
            return doc;
        }).catch(err => { res.status(422).json({ message: err }) });
        if(mob==null)
        {
            saveContact(myobj,res);
        }
        else{
            res.status(200).json({
                message: "Mobile Number Already Exits Enter another Phone"
            });
        }
    }
    else{
        res.status(200).json({
            message: "Mail Already Exits Enter another email"
        });
    }

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

async function deleteAll(myobj, res) {
    const user = await UserModel.deleteOne(myobj).then(result => {
        return result
    }).catch(err => { res.status(422).json({ message: err }) });
    console.log(user.deletedCount);
    if (user.deletedCount > 0) {
        const contact = await ContactModel.deleteOne(myobj).then(result => {
            res.status(200).json({
                message: "Data deleted Successfully from user and contacts "
            });
        }).catch(err => { res.status(422).json({ message: err }) });
    }
    else {
        res.status(200).json({
            message: "Such Data Not Found! Cannot apply delete Operation"
        });
    }

}

router.post('/', [
    // must be an email
    check('email').isEmail(),
    // must be phone number
    check('phone').isMobilePhone(['en-IN']),
], (req, res, next) => {
    try {

        const errors = validationResult(req);
        //console.log(errors);

        if (errors.errors.length == 1) {
            return res.status(422).json({
                error: "Please enter correct " + errors.errors[0].param
            });
        }
        else if (errors.errors.length == 2) {
            return res.status(422).json({
                error: "Please enter correct " + errors.errors[0].param + " and " + errors.errors[1].param
            });
        }
        var myobj = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            dob: req.body.dob
        };

        insert(myobj, res)

    }
    catch (error) {
        res.status(404).json({
            message: "Error:- " + error
        });
    }

});




router.delete('/', [
    // must be phone number
    check('phone').isMobilePhone(['en-IN']),
], (req, res, next) => {
    var myobj = {
        phone: req.body.phone,
    };
    const errors = validationResult(req);
    //console.log(errors);

    if (errors.errors.length == 1) {
        return res.status(422).json({
            error: "Please enter correct " + errors.errors[0].param
        });
    }
    deleteAll(myobj, res)
})

module.exports = router;