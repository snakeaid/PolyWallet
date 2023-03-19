import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MoneyOperation, MoneyOperationDocument } from './money-operation';
import { Model } from 'mongoose';

@Injectable()
export class OperationsService {
  public constructor(
    @InjectModel(MoneyOperation.name)
    private readonly moneyOperationModel: Model<MoneyOperationDocument>,
  ) {}

  public async addOperation(operation: MoneyOperation): Promise<void> {
    await this.moneyOperationModel.create(operation);
  }

  public async getOperationsByUsername(username: string): Promise<MoneyOperation[]> {
    const operations = await this.moneyOperationModel.find({ username: username }).exec();

    return operations;
  }
}
