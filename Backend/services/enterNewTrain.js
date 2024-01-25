import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const enterNewTrain = (req, res) => {
    const { tname, sp, st, dp, dt, dd, distance } = req.body;
    // console.log(req.body);

    const values = [tname, sp, st, dp, dt, dd, distance];

    db.query(
        `INSERT INTO ${process.env.DB_NAME}.train (tname, sp, st, dp, dt, dd, distance) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values,
        (err, result) => {
            if (err) {
                console.error("Database insert error:", err);
                return res.status(500).json({ success: false, error: "Database error", details: err?.message || "Unknown error" });
                // ^^^^ very important to put return here
            }
            return res.json({ success: true });
        }
    );
};
