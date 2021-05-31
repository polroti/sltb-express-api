/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    21-01-2021 - Manoj -  created the file, added username, fullname, password
    31-05-2021 - Manoj -  added new fields: facebookuid, userid
*/

const mongoose = require("mongoose");

const facebookUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  faceBookUid: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("FacebookUser", facebookUserSchema);
