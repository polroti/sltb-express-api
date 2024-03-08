const mongoose = require("mongoose");

const transitNodeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  place_id: {
    type: String,
    required: true,
    unique: true,
    maxLength: 10
  },
  name_en: {
    type: String,
    required: true,
  },
  name_ta: {
    type: String,
    required: true,
  },
  name_si: {
    type: String,
    required: true,
  },
  type:{
    enum:['BUS_HALT','BUS_STAND'],
    required:true
  },
  address:{
    type:String,
  },
  isStartOrEndNode:{
    type:Boolean,
    required: true,
    default: false
  }

});

module.exports = mongoose.model('TransitNode',BookingSchema)