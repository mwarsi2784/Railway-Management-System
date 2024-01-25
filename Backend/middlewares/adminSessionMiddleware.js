import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const adminSessionMiddleware = session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  
});

export default adminSessionMiddleware;
