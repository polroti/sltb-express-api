const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  }, 
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model("Admin", adminUserSchema);