import { Module, ValidationPipe } from '@nestjs/common';
import { initAppModules } from './init/appModules';
import { LoggerModule } from './modules/logger/logger.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppController } from './app.controller';
import { MonobankModule } from './modules/monobank/monobank.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ApplicationExceptionFilter } from './filters/application-exception.filter';

@Module({
  imports: [...initAppModules, LoggerModule, AuthenticationModule, MonobankModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
        }),
    },
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionFilter,
    },
  ],
})
export class AppModule {}
