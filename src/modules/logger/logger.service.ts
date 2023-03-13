import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import * as uuid from 'uuid';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ScopeLogger } from './scope-logger';

export enum LogLevel {
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  public constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly winston: any) {
    super();
  }

  public log(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.INFO, this.buildLogObject(message, context, correlationId));
  }

  public error(message: any, trace?: string, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.ERROR, this.buildLogObject(message, context, correlationId, trace));
  }

  public warn(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.WARNING, this.buildLogObject(message, context, correlationId));
  }

  public debug(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.DEBUG, this.buildLogObject(message, context, correlationId));
  }

  public verbose(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.VERBOSE, this.buildLogObject(message, context, correlationId));
  }

  public toScopeLogger(correlationId: string): ScopeLogger {
    return new ScopeLogger(this, correlationId);
  }

  private buildLogObject(
    message: any,
    context?: string,
    correlationId?: string,
    trace?: string,
  ): LogObject {
    const module = context || this.context;

    let data: LogObject = {
      trace,
      module: module?.replace('Controller', ''),
      correlationId: uuid.validate(correlationId) ? correlationId : this.newCorrelationId(),
    };

    if (message instanceof Object) {
      data = { ...data, ...message };
    } else {
      data.message = message;
    }

    return data;
  }

  private newCorrelationId(): string {
    const correlationId = uuid.v4();
    this.warn(
      `New correlation id:${correlationId} was generated`,
      LoggerService.name,
      correlationId,
    );

    return correlationId;
  }
}
