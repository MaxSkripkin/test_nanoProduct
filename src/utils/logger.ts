import winston from "winston";

const {timestamp, combine, printf} = winston.format;
const myFormat = printf(({timestamp, message}) => `${timestamp} ${message}`);

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info'
    })
  ]
});

export { logger };
