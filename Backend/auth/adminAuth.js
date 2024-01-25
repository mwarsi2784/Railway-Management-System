import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
dotenv.config();

export const authenticateAdmin = (req, res) => {
    const { admin_name, password } = req.body
    // console.log(req.body)

    db.query(`SELECT * FROM ${process.env.DB_NAME}.admin WHERE admin_name = ?`, [admin_name], (err, results) => {
        
        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        
        if (!results ||results.length === 0) {
            return res.status(401).json({ error: "Invalid username" });
        }

        const admin = results[0];

        bcrypt.compare(password, admin.password, function(err, result) {

            if (err) return res.status(500).json({ error: "Error verifying password" });

            if(!result) {return res.status(401).json({ error: "Invalid username or password" });}

            req.session.admin = { id: admin.id, admin_name: admin.admin_name };
            // res.json({ message: "Login successful", session: req.session.admin });
            // res.render("adminDashboard");
            res.render("adminDashboard", { session: req.session.admin });

        });

    });

};
