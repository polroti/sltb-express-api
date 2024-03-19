const mongoose = require('mongoose')
const AdminUser = require('../models/Admin')

exports.createUser = (req, res, next) => {
   AdminUser.findOne({
    user: req.body.savedUser._id
   }).exec().then((existingAdminUser)=>{
    if(existingAdminUser){
        //handle error
    }

   })
}