import { Module, ValidationPipe } from '@nestjs/common';
import { initAppModules } from './init/appModules';
import { LoggerModule } from './modules/logger/logger.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppController } from './app.controller';
import { MonobankModule } from './modules/monobank/monobank.module';
import { APP_PIPE } from '@nestjs/core';

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
  ],
})
export class AppModule {}
