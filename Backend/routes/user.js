import express from "express";
import { Router } from "express";
import db from "../config/db.js";
import dotenv from "dotenv";
import { authenticateUser } from "../auth/userAuth.js";
import isUserAuthenticate from "../middlewares/userAuthMiddleware.js";
import { getEnquiryPage } from "../services/getEnquiryPage.js";
import { getEnquiryResults } from "../services/getEnquireryResults.js";
import { bookTickets } from "../services/BookTickets.js";
import { addPassenger } from "../services/addPassenger.js";
import { userTickets } from "../services/userTickets.js";
import { userLogout } from "../services/userLogout.js";

const router = express.Router();
dotenv.config();


router.get("/userLogin",(req,res)=>{
    res.render("userLogin");
});

router.post("/userLogin",authenticateUser);

router.get("/getDashboard",isUserAuthenticate,(req,res)=>{
    res.render("userDashboard", { session: req.session.user })
});

router.get("/getEnquiryPage",isUserAuthenticate,getEnquiryPage);

router.post("/getEnquiryResults",isUserAuthenticate,getEnquiryResults);

router.post("/bookTickets",isUserAuthenticate,bookTickets);

router.post("/addPassenger",isUserAuthenticate,addPassenger);

router.get("/userTickets",isUserAuthenticate,userTickets);

router.get("/userLogout",isUserAuthenticate,userLogout);







export default router;