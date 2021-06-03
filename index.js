/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    28-09-2020 - Manoj Created Index.js
    07-10-2020 - added mongodb connection & booking route, added secrets.json
*/

const express = require("express");
const sltbApi = express();
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;
const secrets = require("./secrets.json");

const dbName = "sltb_api_db";

//Define Routes
const bookingRoute = require("./components/booking/BookingRoutes");

//Use Routes
sltbApi.use("/api/booking", bookingRoute);

//db connection
mongoose
  .connect(
    `mongodb+srv://${secrets.mongousername}:${secrets.mongopass}@${secrets.mongourl}/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Cloud");
    db = "Connected to MongoDB Cloud";
  })
  .catch(() => {
    console.log("Connection to MongoDB Cloud Failed");
    db = "Cannot connect to MongoDB Cloud";
  });

sltbApi.listen(PORT, () => {
  console.log(`Server Has Started working on port ${PORT}`);
});
