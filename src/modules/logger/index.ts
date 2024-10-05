import fs from "node:fs";
import path from "node:path";
import { Request, Response, NextFunction } from "express";
import { LogFormat, MonitorifyOptions } from "../../@types/logger-types";


export class Monitorify {
    private formatLog: LogFormat;
    private displayLogs: boolean;
    private logLevel: "info" | "warn" | "error";
    private logFilePath: string = "logs/app.log";

    constructor(options?: MonitorifyOptions) {
        this.formatLog = options?.logFormat??"plain-text";
        this.displayLogs = options?.displayLogs??true;
        this.logLevel = options?.logLevel??"info";
    }

    public MonitorifyMiddleware () {
        return (request: Request, response: Response, next: NextFunction) => {
            const start = process.hrtime();

            response.on("finish", () => {
                const diff = process.hrtime(start);
                const timeInMs = diff[0] * 1e3 + diff[1] * 1e-6; // conversão para milissegundos

                this.MonitorifyMessage(request, response, timeInMs);
            });
            next();
        }
    }

    private MonitorifyMessage (request: Request, response: Response, timeInMs: number) {
        const MessageLogParams = {
            timestamp: new Date().toISOString(),
            method: request.method,
            url: request.url,
            statusCode: response.statusCode,
            responseTime: timeInMs,
        }
        const message: string = `[${this.logLevel.toUpperCase()}] ${MessageLogParams.method} - ${MessageLogParams.statusCode} - ${MessageLogParams.responseTime.toFixed(2)}ms`;
        this.setLog(message, this.formatLog);

        if (this.displayLogs) {
            console.log(message);
        }
    }


    private ensureLogDirectoryExists(): void {
        const logDirectory = path.dirname(this.logFilePath);
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }
    }

    private convertMessageToFormat(message: string, format: string): string {
        switch (format) {
            case "plain-text":
                return `${new Date().toISOString()} - ${message}`;
            case "json":
                return JSON.stringify({ timestamp: new Date().toISOString(), message });
            case "xml":
                return `<log><timestamp>${new Date().toISOString()}</timestamp><message>${message}</message></log>`;
            case "csv":
                return `${new Date().toISOString()},${message}`;
            case "syslog":
                return `<${new Date().toISOString()}> ${message}`;
            case "logfmt":
                return `time=${new Date().toISOString()} msg="${message}"`;
            case "apache-clf":
                return `127.0.0.1 - - [${new Date().toISOString()}] "LOG ${message}"`;
            case "ecs":
                return JSON.stringify({ "@timestamp": new Date().toISOString(), message, log: { level: "info" } });
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    public setLog(message: string, format: string = "plain-text"): void {
        this.ensureLogDirectoryExists();

        const formattedMessage = this.convertMessageToFormat(message, format) + "\n";

        // Append the log message to a single file
        fs.appendFileSync(this.logFilePath, formattedMessage, "utf8");
        //console.log(`Log added to ${this.logFilePath} in ${format} format.`);
    }
}