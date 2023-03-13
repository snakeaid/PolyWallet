import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ScopeLogger } from 'src/modules/logger/scope-logger';
import { LoggerService } from '../modules/logger/logger.service';

@Catch()
export class ApplicationExceptionFilter extends BaseExceptionFilter {
  private readonly logger: ScopeLogger;

  public constructor(loggerSevice: LoggerService) {
    super();
    loggerSevice.setContext(ApplicationExceptionFilter.name);
    this.logger = loggerSevice.toScopeLogger(null);
  }

  public catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    super.catch(exception, host);
  }
}
