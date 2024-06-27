//handle different types of logins

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const GenericUser = require('../models/User')


const secrets = require('../../../secrets.json')
const User = require('../models/User')
const Admin = require('../models/Admin')


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

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err,
                code: "UNKNOWN_ERROR",
            });
        }

        const newUser = new GenericUser({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: hash,
            usertype: usertype
        });

        newUser.save().then((savedUser) => {
            if (savedUser._id) {
                req.body.createdUser = savedUser;
                next();
            }
        })
    })
}

exports.checkIfUserExists = (req, res, next) => {
    GenericUser.findOne({
        username: req.body.username
    }).exec().then((existingUser) => {
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                error: "User already exists",
                code: "USER_EXISTS",
            });
        }
        next();
    }).catch(e => {
        res.status(500).json({ 
            message: "Internal server error" 
        });
    })
};

exports.loginWithUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
}

exports.login = (req,res,next) =>{
    const user = req.body.user;
    if((req.body.username || req.body.email) && req.body.password){
        bcrypt.compare(req.body.password, req.body.user.password, (err, result) => {
            if (err) {
                res.status(401).json({
                    error: "Incorrect Password",
                    code: "INCORRECT_PASSWORD",
                });

                if (result) {
                    const token = jwt.sign(
                        {
                            id: user._id,
                            username: user.username,
                            usertype: user.usertype,
                        },
                        secrets.JWT_KEY,
                        {
                            expiresIn: "24h",
                        }
                    );

                    res.status(200).json({
                        message: "Authorization Success",
                        data: {
                            token: token,
                            usertype: user.usertype,
                        },
                        code: "AUTH_SUCCESS",
                    });
                }
                res.status(401).json({
                    error: "Authorization Failed!",
                    code: "AUTH_FAILED",
                });
            }
        })
    }
}

exports.checkUserWithEmail = (req, res, next) => {
    const { password } = req.body;
    Admin.findOne({
        email: req.body.email
    }).exec().then((foundAdminUser) => {
        if (foundAdminUser.user) {
            User.findOne(foundAdminUser.user).exec().then((user) => {
                if (user) {
                    req.body.user = user;
                } else {
                    res.status(404).json({
                        error: "User not found!",
                        code: "USER_NOT_FOUND",
                    });
                }
            })
        }
    })
}