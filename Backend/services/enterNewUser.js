import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const enterNewUser = async (req,res)=>{
    const {emailid,password,mobileno,dob} = req.body;
    // console.log(req.body);
    if (!emailid || !password || !mobileno || !dob) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const values = [emailid, hashedPassword, mobileno, dob];

    db.query(`INSERT INTO ${process.env.DB_NAME}.user (emailid, password, mobileno, dob) VALUES (?, ?, ?, ?)`, values, (err, result)=>{
        if(err){
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        // res.status(201).json({ message: "User registered successfully", result });
        res.redirect("/admin/getAllUsers");
    });


}