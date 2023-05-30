import winston from "winston";

const { format, transports } = winston;
const { combine, timestamp, printf } = format;

const myFormat = printf(({ timestamp, message }): string => {
  return `${timestamp} ${message}`;
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  ]
});

export { errorLogger };
