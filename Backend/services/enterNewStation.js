import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const enterNewStation = (req,res)=>{
    const {sname} = req.body;
    // console.log(req.body);
    const values = [sname];

    db.query(`INSERT INTO ${process.env.DB_NAME}.station (sname) VALUES (?)`, values, (err,result)=>{

        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        // res.status(200).json({ message: "Station inserted successfully", result });
        res.redirect("/admin/getAllStations");

    });
};