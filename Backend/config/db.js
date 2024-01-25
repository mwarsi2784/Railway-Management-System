import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

var db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  export default db;