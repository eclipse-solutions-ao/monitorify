import { LogFormat } from "../../@types/logger-types";

interface LogMessage {
    timestamp: string;
    level: string;
    message: string;
}

export class FormatLog {
    private format: LogFormat;
    constructor(format: LogFormat) { this.format = format }
    
    private defineFormat(message: LogMessage): string {
        switch (this.format) {
            case "plain-text":
                return `[${message.timestamp}] ${message.level}: ${message.message}`;
            case "json":
                return JSON.stringify(message);
            case "xml":
                return this.toXML(message);
            case "csv":
                return this.toCSV(message);
            case "syslog":
                return this.toSyslog(message);
            case "logfmt":
                return this.toLogfmt(message);
            case "apache-clf":
                return this.toApacheCLF(message);
            case "ecs":
                return JSON.stringify(this.toECS(message));
            default:
                return '';
        }
    }

    public log(level: string, message: string, additionalData?: object) {
        const logMessage: LogMessage = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...additionalData
        };

        const formattedMessage = this.defineFormat(logMessage);
        console.log(formattedMessage);
    }

    // Implementações de conversão para formatos específicos
    private toXML(message: LogMessage): string {
        // Lógica para converter para XML
        return `<log>
            <timestamp>${message.timestamp}</timestamp>
            <level>${message.level}</level>
            <message>${message.message}</message>
        </log>`;
    }

    private toCSV(message: LogMessage): string {
        return `${message.timestamp},${message.level},${message.message}`;
    }

    private toSyslog(message: LogMessage): string {
        return `<34>1 ${message.timestamp} mymachine myapp 12345 - - ${message.message}`;
    }

    private toLogfmt(message: LogMessage): string {
        return `time="${message.timestamp}" level=${message.level} msg="${message.message}"`;
    }

    private toApacheCLF(message: LogMessage): string {
        return `${message.timestamp} - - "${message.level}" 200`;
    }

    private toECS(message: LogMessage): object {
        return {
            "@timestamp": message.timestamp,
            log: {
                level: message.level,
                message: message.message
            },
            // Adicione outros campos conforme necessário
        };
    }
}