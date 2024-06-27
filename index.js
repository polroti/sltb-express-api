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
sltbApi.use(express.json());

//Define Routes
const bookingRoute = require("./components/booking/BookingRoutes");
const transitNodeRoute = require("./components/places/routes/transitNodeRoutes");
const userRoutes = require("./components/user/routes/UserRoutes");
//Use Routes
sltbApi.use("/api/booking", bookingRoute);
sltbApi.use('/api/transit/nodes', transitNodeRoute)
sltbApi.use('/api/users', userRoutes)


//db connection
mongoose
  .connect(
    `mongodb+srv://${secrets.mongousername}:${secrets.mongopass}@${secrets.mongourl}/${dbName}`)
  .then(() => {
    console.log("Connected to MongoDB Cloud");
  })
  .catch((e) => {
    console.log(e);
    console.log("Connection to MongoDB Cloud Failed");
  });

sltbApi.listen(PORT, () => {
  console.log(`Server Has Started working on port ${PORT}`);
});
