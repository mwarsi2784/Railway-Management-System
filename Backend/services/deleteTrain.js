import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const deleteTrain = (req,res)=>{
    const {trainno} = req.body;
    // console.log(req.body);
    const values = [trainno];
    db.query(`DELETE from  ${process.env.DB_NAME}.train where trainno=?`, values, (err,result)=>{
        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        return res.json({ success: true });
    });
};