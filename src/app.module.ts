import { Module } from '@nestjs/common';
import { initAppModules } from './init/appModules';
import { LoggerModule } from './modules/logger/logger.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppController } from './app.controller';
import { CredentialsModule } from './modules/credentials/credentials.module';

@Module({
  imports: [...initAppModules, LoggerModule, AuthenticationModule, CredentialsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
