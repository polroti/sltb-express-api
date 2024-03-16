const mongoose = require("mongoose");

const TransitNode = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  place_id: {
    type: String,
    required: true,
    unique: true
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
    type:String,
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
  },
  province:{
    type:String,
    enum: ['WP','SP','EP','NP','NW','CP','NC','UP','SG'],
    required: true
  }

});

module.exports = mongoose.model('TransitNode',TransitNode);