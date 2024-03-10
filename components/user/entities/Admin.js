const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: String,
    required: true,
  },
  isActive:{
    type: Boolean,
    required: true,
    default: true
  }
})
 
module.exports = mongoose.model("AdminUser", adminUserSchema);