import { Module } from '@nestjs/common';
import { CredentialsModule } from '../credentials/credentials.module';
import { MonobankController } from './monobank.controller';
import { HttpModule } from '@nestjs/axios';
import { MonobankService } from './monobank.service';

@Module({
  imports: [CredentialsModule, HttpModule],
  providers: [MonobankService],
  controllers: [MonobankController],
  exports: [MonobankService],
})
export class MonobankModule {}
