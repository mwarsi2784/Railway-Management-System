import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllTrains = (req, res) => {
    // First, get the stations and trains
    db.query(`SELECT * FROM ${process.env.DB_NAME}.station`, (err, stationResults) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        }

        db.query(`SELECT * FROM ${process.env.DB_NAME}.train`, (err, trainResults) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
            }

            // Pass both station and train data to the trains page
            res.render('trains', { trains: trainResults, stations: stationResults });
        });
    });
};
