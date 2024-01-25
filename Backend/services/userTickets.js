import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const userTickets =  (req, res) => {
 
    const email = req.session.user?.user_emailid;
    if (!email) {
        return res.status(401).send("Unauthorized: No user session found.");
    }
    const getUserQuery = `SELECT id FROM ${process.env.DB_NAME}.user WHERE emailid = ?`;
    db.query(getUserQuery,[email],(err,userResult)=>{
        if (err || userResult.length === 0) {
            return res.status(500).json({ error: "User lookup failed", details: err?.message || "User not found" });
        }
        const userid = userResult[0].id;
        db.query(`SELECT * FROM ${process.env.DB_NAME}.resv where id=?`,[userid],(err,result)=>{
            if (err || result.length === 0) {
                return res.status(500).json({ error: "Reservation lookup failed", details: err?.message || "Train not found" });
            }
            res.render("userTickets",{reservedTickets: result});

        });
    });

};
