import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const editTrain = (req, res) => {
    const { trainno, tname,sp,st,dp,dt,dd,distance } = req.body;
    // console.log("Editing station:", req.body);

    const values = [tname, sp, st, dp, dt, dd, distance,trainno];

    db.query(
        `UPDATE ${process.env.DB_NAME}.train SET tname = ?,sp= ?, st=?, dp=?, dt=?, dd=?, distance=?  WHERE trainno = ?`,
        values,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error",
                    details: err?.message || "Unknown error"
                });
            }

            res.redirect("/admin/getAllTrains");
        }
    );
};
