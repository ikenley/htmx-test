import winston from "winston";
import { getConfigOptions } from "../config";

const config = getConfigOptions();
export const LoggerToken = "logger";

const transports = [];
if (process.env.NODE_ENV === "test") {
  transports.push(
    new winston.transports.File({ filename: `${config.app.name}.log` })
  );
} else {
  if (process.env.NODE_ENV !== "development") {
    transports.push(new winston.transports.Console());
  } else {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"],
          }),
          winston.format.printf(({ timestamp, level, message, metadata }) => {
            const moduleName = metadata?.module ? ` [${metadata.module}]` : "";
            return `${timestamp} ${level}${moduleName}: ${message} ${
              metadata ? JSON.stringify(metadata) : ""
            }`;
          }),
          winston.format.errors({ stack: true })
        ),
      })
    );
  }
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json(),
    winston.format.errors({ stack: true })
  ),
  transports,
  defaultMeta: {
    app: config.app,
  },
});

export default LoggerInstance;
