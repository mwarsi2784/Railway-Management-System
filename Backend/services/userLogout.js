import dotenv from "dotenv";
dotenv.config();
import db from "../config/db.js";

export const userLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out.");
        }
        res.render("userLogin");
    });
};

