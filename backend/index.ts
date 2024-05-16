import express, { Express } from 'express';
import { Op } from "sequelize";
import dotenv from 'dotenv';
import http from "http";
import cors from 'cors';
import bodyparser from 'body-parser';
import { Application } from './models/application.model';
import { Server } from "socket.io";
import cron from "node-cron";
import fs from "fs";
import helmet from "helmet";

import applicationRouter from "./routes/application.route"

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

const corsOptions = {
    origin: process.env.CORS_URL || "http://127.0.0.1:5173"
}

// Cron jobs
cron.schedule("0 0 7,15 * * 1,2,3,4,5", async () => {
    const applications: any = await Application.findAll({ where: { amount: { [Op.gte]: 100000 } } });

    for (const application of applications) {
        const applicationString = JSON.stringify(application);
        fs.writeFileSync("./reports/highAmountLoans.txt", `${new Date().toUTCString()} ${applicationString}\n`, { flag: "a+" });
    }
})

// Middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

// Routes
app.use(applicationRouter);

const server = http.createServer(app);

// Socket.io connection
export const io = new Server(server, { cors: { origin: process.env.CORS_URL || "http://127.0.0.1:5173" } })
io.on("connection", (socket) => {
    socket.emit("con", { message: "a new client connected" })
    console.log("Socket.io running")
})

server.listen(port, () => {
    console.log("Server started on port " + port);
})