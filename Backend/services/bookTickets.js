import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const bookTickets = (req, res) => {
    const { trainno, doj, classs, tickets } = req.body;
    const email = req.session.user?.user_emailid;
    if (!email) {
        return res.status(401).send("Unauthorized: No user session found.");
    }

    // Step 1: Get user ID from email
    const getUserQuery = `SELECT id FROM ${process.env.DB_NAME}.user WHERE emailid = ?`;
    db.query(getUserQuery, [email], (err, userResult) => {
        if (err || userResult.length === 0) {
            return res.status(500).json({ error: "User lookup failed", details: err?.message || "User not found" });
        }

        const userid = userResult[0].id;
        // Step 2: Get SP, DP from train table
        const getTrainQuery = `SELECT sp, dp FROM ${process.env.DB_NAME}.train WHERE trainno = ?`;
        db.query(getTrainQuery, [trainno], (err, trainResult) => {
            if (err || trainResult.length === 0) {
                return res.status(500).json({ error: "Train lookup failed", details: err?.message || "Train not found" });
            }

            const { sp, dp } = trainResult[0];
            console.log(trainResult[0]);
            // Step 3: Get fare from classseats table
            const getFareQuery = `
                SELECT fare, seatsleft 
                FROM ${process.env.DB_NAME}.classseats 
                WHERE trainno = ? AND doj = ? AND class = ?
            `;
            console.log(doj);
            db.query(getFareQuery, [trainno, doj, classs], (err, seatResult) => {
                if (err || seatResult.length === 0) {
                    return res.status(500).json({ error: "Class seat lookup failed", details: err?.message || "No class seat data" });
                }

                const { fare, seatsleft } = seatResult[0];

                if (seatsleft < parseInt(tickets)) {
                    return res.status(400).json({ error: "Not enough seats available" });
                }

                const tfare = fare * parseInt(tickets);

                // Step 4: Update seatsleft
                const updateSeatsQuery = `
                    UPDATE ${process.env.DB_NAME}.classseats 
                    SET seatsleft = seatsleft - ? 
                    WHERE trainno = ? AND doj = ? AND class = ?
                `;
                db.query(updateSeatsQuery, [tickets, trainno, doj, classs], (err, updateResult) => {
                    if (err) {
                        return res.status(500).json({ error: "Failed to update seats", details: err.message });
                    }

                    // Step 5: Insert into resv table
                    const insertResvQuery = `
                        INSERT INTO ${process.env.DB_NAME}.resv
                        (id, trainno, sp, dp, doj, class, nos, status, tfare)
                        VALUES (?, ?, ?, ?, ?, ?, ?, 'current', ?)
                    `;
                    const resvValues = [userid, trainno, sp, dp, doj, classs, tickets, tfare];

                    db.query(insertResvQuery, resvValues, (err, insertResult) => {
                        if (err) {
                            return res.status(500).json({ error: "Failed to insert reservation", details: err.message });
                        }

                        // res.send("Reservation successful");
                        const pnr = insertResult.insertId;
                        console.log(pnr);
                        res.render("addPassenger", { pnr, nos: tickets });

                    });
                });
            });
        });
    });
};
