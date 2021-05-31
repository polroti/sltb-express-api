/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    31-05-2021 - Manoj -  created the file, added googleUid,userid 
    
*/

const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleUid: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("GoogleUser", googleUserSchema);
