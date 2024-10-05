export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export type HttpStatusCode =
  | 100 | 101 | 102 | 103
  | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
  | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308
  | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 427 | 428 | 429 | 431 | 451
  | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

export type LogFormat = "plain-text" | "json" | "xml" | "csv" | "syslog" | "logfmt" | "apache-clf" | "ecs";

export interface MonitorifyOptions {
    logFormat: LogFormat,
    logLevel: "info" | "warn" | "error",
    logStorage?: "json" | "database" | "logfile",   
    displayLogs: boolean,    
    dashboard?: {
        enabled: boolean,      
        port: number,    
    },
    filters?: {
        method?: HttpMethod[]
        statusCode?: HttpStatusCode[]
    }
}