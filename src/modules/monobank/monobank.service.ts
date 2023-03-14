import { HttpStatus, Injectable } from '@nestjs/common';
import { MonobankCredentialsModel } from './credentials/monobank-credentials.model';
import { IntegrationsEnum } from '../../shared/enums/integrations.enum';
import { ScopeLogger } from '../logger/scope-logger';
import { LoggerService } from '../logger/logger.service';
import { MonobankAPI } from './monobank.api';
import { InvalidCredentialsException } from 'src/exceptions/invalid-credentials.exception';
import { MonobankCredentialsManager } from './credentials/monobank-credentials.manager';

@Injectable()
export class MonobankService {
  private readonly logger: ScopeLogger;

  public constructor(
    private readonly credentialsManager: MonobankCredentialsManager,
    private readonly api: MonobankAPI,
    loggerService: LoggerService,
  ) {
    loggerService.setContext(MonobankService.name);
    this.logger = loggerService.toScopeLogger(null);
  }

  public async authenticate(username: string, credentialsModel: MonobankCredentialsModel) {
    const response = await this.api.getClientInfo(credentialsModel.token);

    if (response.status === HttpStatus.OK) {
      this.logger.debug(`${username} credentials for ${IntegrationsEnum.MONO_BANK} are valid.`);
    } else if (response.status === HttpStatus.FORBIDDEN) {
      throw new InvalidCredentialsException(
        `${username} credentials for ${IntegrationsEnum.MONO_BANK} are not valid.`,
      );
    }
  }

  public async addNewUser(username: string, credentialsModel: MonobankCredentialsModel) {
    await this.authenticate(username, credentialsModel);

    const credentials = this.credentialsManager.getCredentialsAsync(username);
    if (!credentials) {
      await this.credentialsManager.saveCredentialsAsync(username, credentialsModel);
    }
  }
}
