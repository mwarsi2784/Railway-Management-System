import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllUsers = (req, res) => {
    db.query(
        `SELECT * FROM ${process.env.DB_NAME}.user`, 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
            }
            // res.send(results);
            res.render('users',{users:results});
        }
    );
};
