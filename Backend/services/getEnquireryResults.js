import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getEnquiryResults = (req, res) => {
    const { start, destination, doj } = req.body;

    const sql = `
        SELECT cs.trainno, cs.doj, cs.class, cs.seatsleft, cs.fare
        FROM ${process.env.DB_NAME}.classseats cs
        JOIN ${process.env.DB_NAME}.train rs ON cs.trainno = rs.trainno
        JOIN ${process.env.DB_NAME}.train re ON cs.trainno = re.trainno
        WHERE cs.doj = ?
          AND rs.sp = ?
          AND re.dp = ?
    `;

    const values = [doj, start, destination];

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err?.message || "Unknown error" });
        }
        res.render('enquiryPageResults', { results });
    });
};
