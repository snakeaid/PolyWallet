import { Module } from '@nestjs/common';
import { CredentialsModule } from '../credentials/credentials.module';
import { MonobankController } from './monobank.controller';
import { HttpModule } from '@nestjs/axios';
import { MonobankService } from './monobank.service';
import { MonobankAPI } from './monobank.api';
import { MonobankCredentialsManager } from './credentials/monobank-credentials.manager';

@Module({
  imports: [
    CredentialsModule,
    HttpModule.register({
      validateStatus: (status) => status < 500,
    }),
  ],
  providers: [MonobankAPI, MonobankCredentialsManager, MonobankService],
  controllers: [MonobankController],
  exports: [MonobankService],
})
export class MonobankModule {}
