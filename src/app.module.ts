import { Module } from '@nestjs/common';
import { initAppModules } from './init/appModules';
import { LoggerModule } from './modules/logger/logger.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppController } from './app.controller';

@Module({
  imports: [...initAppModules, LoggerModule, AuthenticationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
