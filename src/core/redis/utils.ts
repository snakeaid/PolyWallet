import { ConsoleLogger } from '@nestjs/common';

const logger = new ConsoleLogger();

export const redisConsole = (...params: string[]): void => logger.log('[REDIS]', ...params);
