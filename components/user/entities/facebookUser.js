/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    21-01-2021 - Manoj -  created the file, added username, fullname, password
*/

const mongoose = require('mongoose')

const facebookUserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId
})