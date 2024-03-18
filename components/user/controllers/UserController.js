//handle different types of logins

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const GenericUser = require('../models/User')
const AdminUser = require('../models/Admin')

const secrets = require('../../../secrets.json')


exports.login = (req, res, next) => {
    const { username, password } = req.body;

    GenericUser.findOne({
        username: username
    }).exec().then((foundUser) => {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        error: "Incorrect Password",
                        code: "INCORRECT_PASSWORD",
                    })
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            id: foundUser._id,
                            usertype: foundUser.usertype
                        },
                        secrets.JWT_KEY,
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        message: "Authorization Success",
                        data: {
                            token: token,
                            usertype: foundUser.usertype,
                        },
                        code: "AUTH_SUCCESS",
                    });
                }
            })
        }
    })
}

exports.createUser = (req, res, next) => {
    const { username, password, usertype } = req.body;

    GenericUser.findOne({
        username: username
    }).exec().then((existingUser) => {
        if (existingUser) {
            res.status(409).json({
                message: "User already exists",
                error: "User already exists",
                code: "USER_EXISTS",
              });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    code: "UNKNOWN_ERROR",
                });
            }

            req.body._id = new mongoose.Types.ObjectId();
            req.body.password = hash;
            const newUser = new GenericUser(req.body);

            newUser.save().then((savedUser) => {
                if(savedUser._id){
                    next();
                }
            })
        })
    })
}