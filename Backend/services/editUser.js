import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const editUser = (req, res) => {
    const { id, emailid, mobileno } = req.body;
    // console.log("Editing user:", req.body);

    const values = [mobileno, emailid, id];

    db.query(
        `UPDATE ${process.env.DB_NAME}.user SET mobileno = ?, emailid=? WHERE id = ?`,
        values,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error",
                    details: err?.message || "Unknown error"
                });
            }

            res.redirect("/admin/getAllUsers");
        }
    );
};
