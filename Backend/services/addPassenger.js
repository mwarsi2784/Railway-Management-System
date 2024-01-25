import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const addPassenger = (req,res)=>{
    const {pnr,page,pgender,pname} = req.body;
    console.log(req.body);
    const values = [pnr,page,pgender,pname];
    db.query(`INSERT INTO ${process.env.DB_NAME}.pd (pnr,page,pgender,pname) VALUES (?, ?, ?, ?)`, values, (err,result)=>{
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Insert failed", details: err.message });
        }        
        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        if(err){
            console.log(err.message);
        }
        res.status(200).json({ message: "Passenger inserted successfully", result });
        // res.redirect("/getDashboard");
    });
};