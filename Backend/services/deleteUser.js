import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const deleteUser = (req,res)=>{
    const {id} = req.body;
    // console.log(req.body);
    const values = [id];

    db.query(`DELETE from  ${process.env.DB_NAME}.user where id=?`, values, (err,result)=>{

        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        // res.status(200).json({ message: "Station inserted successfully", result });
        res.redirect("/admin/getAllUsers");

    });
};