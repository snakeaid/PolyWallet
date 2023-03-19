import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoneyOperation, MoneyOperationSchema } from './money-operation';
import { OperationsResolver } from './operations.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MoneyOperation.name, schema: MoneyOperationSchema }]),
  ],
  providers: [OperationsService, OperationsResolver],
  exports: [OperationsService],
})
export class OperationsModule {}
