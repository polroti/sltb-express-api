/* 
   ====================== PLEASE ADD YOUR CHANGE DESCRIPTIONS HERE ==============
    28-09-2020 - Manoj Created Index.js
*/

const express = require('express')
const sltbApi = express()

const PORT = 5000 || process.env.PORT


sltbApi.listen(PORT,()=>{
    console.log(`Server Has Started working on port ${PORT}`);
})
