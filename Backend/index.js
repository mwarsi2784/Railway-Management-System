import express from "express";
import { Router } from "express";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import db from "./config/db.js";
import adminSessionMiddleware from "./middlewares/adminSessionMiddleware.js";
import userSessionMiddleware from "./middlewares/userSessionMiddleware.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";




dotenv.config();


const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(adminSessionMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));



app.use("/admin",adminRouter);
app.use("/user",userRouter);


app.listen(port,()=>{
    console.log(`Server is listening in port ${port}`);
})