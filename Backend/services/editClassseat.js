import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const editClassseat = (req, res) => {
    const { trainno,doj, fare, seatsleft,classs } = req.body;
    // console.log(req.body);
    const values = [fare,seatsleft,trainno,doj,classs];
    db.query(
        `UPDATE ${process.env.DB_NAME}.classseats SET fare = ?, seatsleft=? WHERE trainno = ? AND doj = ? AND class=?`,
        values,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error",
                    details: err?.message || "Unknown error"
                });
            }
            res.redirect("/admin/getAllClassseats");
        }
    );
};
