import express from "express";
import { Router } from "express";
import db from "../config/db.js";
import dotenv from "dotenv";
import { authenticateAdmin } from "../auth/adminAuth.js";
import isAdminAuthenticate from "../middlewares/adminAuthMiddleware.js";
import {getAllTrains} from "../services/getAllTrains.js";
import {getAllStations} from "../services/getAllStations.js";
import {getAllUsers} from "../services/getAllUsers.js";
import {getAllBookedTickets} from "../services/getAllBookedTickets.js";
import {getAllCancelledTickets} from "../services/getAllCancelledTickets.js";
import {enterNewTrain} from "../services/enterNewTrain.js";
import { enterNewUser } from "../services/enterNewUser.js";
import { enterNewStation } from "../services/enterNewStation.js";
import { deleteStation } from "../services/deleteStation.js"
import { editStation } from "../services/editStation.js";
import { deleteTrain } from "../services/deleteTrain.js";
import { editTrain } from "../services/editTrain.js";
import { deleteUser } from "../services/deleteUser.js";
import { editUser } from "../services/editUser.js";
import { getClassseats } from "../services/getClassseats.js";
import { enterClassseats } from "../services/enterClassseats.js";
import { getAllClassseats } from "../services/getAllClassseats.js";
import { deleteClassseat } from "../services/deleteClassseat.js";
import {editClassseat} from "../services/editClassseat.js";
import {adminLogout} from "../services/adminLogout.js";

const router = express.Router();
dotenv.config();



router.get("/adminLogin",(req,res)=>{
    res.render("adminLogin");
})

router.get("/getDashboard",isAdminAuthenticate,(req,res)=>{
    res.render("adminDashboard", { session: req.session.admin })
});

router.post("/adminLogin",authenticateAdmin);

router.get("/getAllTrains",isAdminAuthenticate,getAllTrains);

router.get("/getAllStations",isAdminAuthenticate,getAllStations);

router.get("/getAllUsers",isAdminAuthenticate,getAllUsers);

router.get("/getAllBookedTickets",isAdminAuthenticate,getAllBookedTickets);

router.get("/getAllCancelledTickets",isAdminAuthenticate,getAllCancelledTickets);

router.post("/enterNewTrain",isAdminAuthenticate,enterNewTrain);

router.post("/enterNewUser",isAdminAuthenticate,enterNewUser);

router.post("/enterNewStation",isAdminAuthenticate,enterNewStation);

router.post("/deleteStation",isAdminAuthenticate,deleteStation);

router.post("/editStation",isAdminAuthenticate,editStation);

router.post("/deleteTrain", isAdminAuthenticate,deleteTrain);

router.post("/editTrain",isAdminAuthenticate,editTrain);

router.post("/deleteUser", isAdminAuthenticate,deleteUser);

router.post("/editUser",isAdminAuthenticate,editUser);

router.get("/getClassseats",isAdminAuthenticate,getClassseats);

router.post("/enterClassseats",isAdminAuthenticate,enterClassseats);

router.get("/getAllClassseats",isAdminAuthenticate,getAllClassseats);

router.post("/deleteClassseat",isAdminAuthenticate,deleteClassseat);

router.post("/editClassseat",isAdminAuthenticate,editClassseat);

router.get("/adminLogout",isAdminAuthenticate,adminLogout);

export default router;