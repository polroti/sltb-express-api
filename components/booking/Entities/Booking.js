/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    28-09-2020 - Manoj Created Booking.js
    01-10-2020 - Changed route to routeId, Added module export
*/

const mongoose=require('mongoose');

const BookingSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    BookingId :{
        type:String,
        required:true
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isPaid:{
        type:mongoose.Schema.Types.Boolean,
        required:true
    },
    routeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Routes'
    },
    busId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bus',
        required:true
    },
    seats:{
        type:mongoose.Schema.Types.Array,
        required:true
    },
    pickupLocation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
        required:true
    },
    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
        required:true
    },
    departureTime:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    travelTime:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    isConfirmed:{
        type:mongoose.Schema.Types.Boolean,
        required:true
    },
    serviceType:{
        type:mongoose.Schema.Types.String,
        enum : [
            'normal',
            'semiluxury',
            'luxury',
            'superluxury'
        ],
        default:'normal'
    },
    price:{
        type:mongoose.Schema.Types.String,
        required:true,
        get:(num)=>{
            return (num /100).toFixed(2)
        },
        set:(num)=>{
            return num * 100
        }
    }

})

module.exports = mongoose.model('Booking',BookingSchema)