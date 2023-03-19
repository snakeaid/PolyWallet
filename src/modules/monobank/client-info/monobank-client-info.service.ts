import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MonobankClientInfo,
  MonobankClientInfoDocument,
} from './schemas/monobank-client-info.schema';
import { Model } from 'mongoose';
import { ScopeLogger } from '../../logger/scope-logger';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class MonobankClientInfoService {
  private readonly logger: ScopeLogger;

  public constructor(
    @InjectModel(MonobankClientInfo.name)
    private readonly monobankClientInfoModel: Model<MonobankClientInfoDocument>,
    loggerService: LoggerService,
  ) {
    loggerService.setContext(MonobankClientInfoService.name);
    this.logger = loggerService.toScopeLogger(null);
  }

  public async saveClientInfo(clientInfo: MonobankClientInfo): Promise<void> {
    this.logger.debug(`Saving ${clientInfo.username} client info to DB...`);
    await this.monobankClientInfoModel.create(clientInfo);
  }

  public async getClientInfoByUsername(username: string): Promise<MonobankClientInfo> {
    const clientInfo = await this.monobankClientInfoModel.findOne({ username: username }).exec();

    return clientInfo;
  }
}
