import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllBookedTickets = (req, res) => {
    const query = `SELECT * FROM ${process.env.DB_NAME}.resv WHERE status = ?`;

    db.query(query, ["BOOKED"], (err, results) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        }
        res.json(results);
    });
};
