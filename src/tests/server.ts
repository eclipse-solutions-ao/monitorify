import express, { Request, Response } from "express";
import cors from "cors";
import { Monitorify } from "../modules/logger";

const monitorify = new Monitorify({
    logFormat: "xml",
    displayLogs: true,
    logLevel: "info"
});

const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(monitorify.MonitorifyMiddleware());

server.get("/", async (request: Request, response: Response) => {
    response.send("<h1>Welcome in Monitorie Dashboard</h1>")
})

server.listen(3000, () => {
    console.log("Server running in http://127.0.0.1:3000");
});



