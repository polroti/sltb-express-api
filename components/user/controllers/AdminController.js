const mongoose = require('mongoose')
const AdminUser = require('../models/Admin')
const User = require('../models/User')

exports.createAdminUser = (req, res, next) => {
    const { firstName, lastName, email, phone } = req.body;

    const newAdmin = new AdminUser(
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            isActive: true,
            user: req.body.createdUser._id
        }
    )
    newAdmin.save().then((createdAdmin) => {
        if (createdAdmin) {
            res.status(201).json({
                message:"User Created",
                user: req.body.createdUser,
                admin: createdAdmin
            })
        }
    })
}

exports.checkIfAdminUserExists = (req, res, next) => {
    AdminUser.findOne({
        email: req.body.email
    }).exec().then((existingUser) => {
        if (existingUser) {
            return res.status(409).json({
                error: "Admin User already exists",
                code: "ADMIN_USER_EXISTS"
            });
        }
        next();
    }).catch(error => {
        res.status(500).json({ 
            message: "Internal server errorsss" 
        });
    });
};