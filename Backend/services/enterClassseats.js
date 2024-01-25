import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const enterClassseats = (req,res)=>{
    const {trainno,classs,fare,seatsleft,doj} = req.body;
    // console.log(req.body);
    const values = [trainno,classs,fare,seatsleft,doj];
    db.query(`INSERT INTO ${process.env.DB_NAME}.classseats (trainno, class, fare, seatsleft,doj) VALUES (?, ?, ?, ?, ?)`, values, (err,result)=>{
        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        res.status(200).json({ message: "Schedule inserted successfully", result });
    });
};