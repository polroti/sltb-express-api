/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    28-09-2020 - Manoj Created Bus.js
*/

const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    busId:{
        type:String, //e.g for a bus belonging to katubedda - KTBxx
        required:true
    },
    licenseNo:{
        type:String,
        required:true
    },
    make:{
        type:String,
        required: true
    },
    model:{
        type:String,
        required:true
    },
    manufacturedYear:{
        type:String,
        required:true
    },
    numberOfSeats:{
        type:Number,
        required:true
    },
    busCondition:{
        type:String,
        enum:[
            'New',
            'InService',
            'UnderRepair',
            'InShed',
            'Obsolete',
            'Seized'
        ],
        default:'New'
    },
    servingRoute:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Route',
        required:true
    },
    driverName:{
        type:String,
        required:true
    },
    conductorName:{
        type:String,
        required: true
    }
})