import { Request, Response, NextFunction } from "express";
import { LogFormat, MonitorifyOptions } from "../../@types/logger-types";
import { FormatLog } from "./formatLog";

export class Monitorify {
    private formatLog: LogFormat;
    private displayLogs: boolean;
    constructor(options?: MonitorifyOptions) {
        this.formatLog = options?.logFormat??"plain-text";
        this.displayLogs = options?.displayLogs??true;
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
        // 1. Metodo, 2. URL, 3. Status Code, 4. Tempo de resposta, 5. Data de quando ocorreu o log
        // 6. Resposta, 7. Peso da resposta, 8. Request, 9. Peso da Request
        const logEntry = {
            method: request.method,
            url: request.url,
            statusCode: response.statusCode,
            responseTime: timeInMs,
            requestBody: request.body,
            requestSize: request.headers["content-length"]?? 0,
            timestamp: new Date().toISOString(),
        }
        // Construir as mensagens
        new FormatLog(this.formatLog);
        
        
        // verificar se tem perimissão para mostrar os log no console.
        if (this.displayLogs) {
            console.log(logEntry);
        }
    }
}