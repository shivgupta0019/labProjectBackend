// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Ashish",
//   database: "centraldb",
//   waitForConnections: true,
//   connectionLimit: 10
// });

// module.exports = pool;


const mongoose = require("mongoose");

const pool =async ()=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/centrallab")
    console.log("MongoDB Connected");
  }catch {
    console.log(error);
  }
}


module.exports = pool;