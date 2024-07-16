import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import taskRouter from "./router/taskRouter.js";
import userRouter from "./router/userRouter.js";

dotenv.config({path : "./config/config.env"});

const app = express();

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/task' , taskRouter);
app.use('/auth' , userRouter);


app.use((err , req , res , next) => {
    const message = err.message || "internal server error(user)!!";
    const status = err.status || 500;
    const success = false;

    res.status(status).json({message , success});
})

dbConnection();


export default app;