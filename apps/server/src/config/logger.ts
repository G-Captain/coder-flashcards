import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const devLogFormat = format.printf(
  ({ level, message, label, timestamp, stack }) =>
    `${timestamp} [${level}]: ${stack || message}`
);

const prodTransport = new DailyRotateFile({
  filename: 'flashcards-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  dirname: '../../logs',
  //   maxFiles: '14d',
});

const devLogger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    devLogFormat
  ),
  transports: [new transports.Console()],
});

const prodLogger = createLogger({
  level: 'http',
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [prodTransport],
});

export const logger =
  process.env.NODE_ENV === 'development' ? devLogger : prodLogger;

module.exports = { logger };
