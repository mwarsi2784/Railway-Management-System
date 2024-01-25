import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const deleteClassseat = (req,res)=>{
    const {trainno,doj,classs} = req.body;
    // console.log(req.body);
    const values = [trainno,doj,classs];
    db.query(`DELETE from  ${process.env.DB_NAME}.classseats where trainno=? AND doj=? AND class=?`, values, (err,result)=>{
        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        res.redirect("/admin/getAllClassseats");
    });
};