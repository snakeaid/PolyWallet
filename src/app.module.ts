import { Module } from '@nestjs/common';
import { initAppModules } from './init/appModules';

@Module({
  imports: [...initAppModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
