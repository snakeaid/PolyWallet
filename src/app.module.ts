import { Module } from '@nestjs/common';
import { initAppModules } from './init/appModules';
import { LoggerModule } from './modules/logger/logger.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [...initAppModules, LoggerModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
