import { Module } from '@nestjs/common';
import { CredentialsModule } from '../credentials/credentials.module';
import { MonobankController } from './monobank.controller';
import { HttpModule } from '@nestjs/axios';
import { MonobankService } from './monobank.service';
import { MonobankAPI } from './monobank.api';
import { MonobankCredentialsManager } from './credentials/monobank-credentials.manager';
import { MonobankClientInfoService } from './client-info/monobank-client-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MonobankClientInfo,
  MonobankClientInfoSchema,
} from './client-info/schemas/monobank-client-info.schema';
import { OperationsModule } from '../operations/operations.module';
import { MonobankOperationsService } from './operations/monobank-operations.service';

@Module({
  imports: [
    CredentialsModule,
    OperationsModule,
    HttpModule.register({
      validateStatus: (status) => status < 500,
    }),
    MongooseModule.forFeature([
      { name: MonobankClientInfo.name, schema: MonobankClientInfoSchema },
    ]),
  ],
  providers: [
    MonobankAPI,
    MonobankCredentialsManager,
    MonobankClientInfoService,
    MonobankOperationsService,
    MonobankService,
  ],
  controllers: [MonobankController],
})
export class MonobankModule {}
