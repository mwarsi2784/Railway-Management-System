import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
dotenv.config();

export const authenticateUser = (req, res) => {
    const { emailid, password } = req.body
    console.log(req.body)

    db.query(`SELECT * FROM ${process.env.DB_NAME}.user WHERE emailid = ?`, [emailid], (err, results) => {
        
        if(err) return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        
        if (!results ||results.length === 0) {
            return res.status(401).json({ error: "Invalid user Email" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, function(err, result) {

            if (err) return res.status(500).json({ error: "Error verifying password" });

            if(!result) {return res.status(401).json({ error: "Invalid username or password" });}

            req.session.user = { id: user.id, user_emailid: user.emailid };
            res.render("userDashboard", { session: req.session.user });

        });

    });

};
