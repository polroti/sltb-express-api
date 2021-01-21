/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    07-10-2020 - Manoj - File created. addBooking route

*/
const express = require('express')
const router = express.Router()

//CRUD METHODS
const addBooking = require('../booking/Methods/addBooking')

// Add a new booking
router.post('/add', addBooking.AddBooking);


module.exports = router;