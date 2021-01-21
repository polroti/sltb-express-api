/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    21-01-2021 - Manoj - created the file, added username, fullname, password
*/

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})