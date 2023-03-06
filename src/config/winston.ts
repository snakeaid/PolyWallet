import { registerAs } from '@nestjs/config';
import * as winston from 'winston';

export default registerAs('winston', () => {
  const colorize = process.env.NODE_ENV === 'development';

  return {
    transports: [
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'error', // minimum level value (from 'error' to 'debug')
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize({ all: colorize, level: colorize }),
          winston.format.printf((log) => {
            const module = log.module ? `[\x1b[33m${log.module}\x1b[37m]` : '';
            const trace = log.trace ? `\x1b[31m\n[${log.trace}]\x1b[37m` : '';
            const correlationId = log.correlationId ? `[${log.correlationId}]` : '';
            const traceId = log.traceId ? ` ${log.traceId} ` : ' ';

            return `[${log.level}] ${correlationId}${traceId}${log.timestamp} [${log.service}]${module} ${log.message} ${trace}`;
          }),
        ),
      }),
    ],
  };
});
