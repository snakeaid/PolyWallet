import { Module } from '@nestjs/common';
import { initAppModules } from './init/appModules';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [...initAppModules, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
