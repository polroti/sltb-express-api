/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    28-09-2020 - Manoj Created addBooking.js
    01-10-2020 - Started Adding addbooking method
    03-10-2020 - finished the newBookingRecord signature and added the body for method getTravelTime()
    07-10-2020 - booking creation result and error handling

*/


const mongoose = require('mongoose')
const Booking = require('../Entities/Booking')
exports.AddBooking = (req,res,next)=>{
    
    let travelTime = getTravelTime(pickupLocation,destination)
    
    bookingId = Math.random()*10000000 + req.userId + Date.now().toString
    const newBookingRecord = new Booking({
        _id:mongoose.Schema.Types.ObjectId(),
        UserId: req.body.userId,
        isPaid : false,
        routeId: req.body.routeId,
        busId : req.body.BusId,
        seats: req.body.seats,
        pickupLocation: req.body.pickupLocation,
        destination: req.body.destination,
        departureTime:req.body.departureTime,
        travelTime:travelTime,
        isConfirmed:false,
        serviceType:req.body.serviceType,
        price: req.body.price
    })

    newBookingRecord.save().then(result=>{
        console.log('Booking Saved!');
        res.status(201).json({
            message:"Booking Created Successfully!",
            booking: result
        });
    }).catch(err=>{
        console.log('Error saving booking');
        res.status(500).json({
            error:err
        })
    })
    
}

function getTravelTime(pickupLocation,destination){
    //get google maps direction and time
}