import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const editStation = (req, res) => {
    const { id, sname } = req.body;
    // console.log("Editing station:", req.body);

    const values = [sname, id];

    db.query(
        `UPDATE ${process.env.DB_NAME}.station SET sname = ? WHERE id = ?`,
        values,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error",
                    details: err?.message || "Unknown error"
                });
            }

            res.redirect("/admin/getAllStations");
        }
    );
};
