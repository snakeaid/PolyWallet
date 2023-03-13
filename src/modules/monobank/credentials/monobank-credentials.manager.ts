import { Injectable } from '@nestjs/common';
import { CredentialsService } from '../../credentials/credentials.service';
import { MonobankCredentialsModel } from './monobank-credentials.model';
import { IntegrationsEnum } from '../../../shared/enums/integrations.enum';
import { CredentialsKey } from '../../credentials/credentials.interface';
import { LoggerService } from '../../logger/logger.service';
import { ScopeLogger } from '../../logger/scope-logger';

@Injectable()
export class MonobankCredentialsManager {
  private readonly logger: ScopeLogger;

  public constructor(
    private readonly credentialsService: CredentialsService,
    loggerService: LoggerService,
  ) {
    loggerService.setContext(MonobankCredentialsManager.name);
    this.logger = loggerService.toScopeLogger(null);
  }

  public async getCredentialsAsync(username: string) {
    const credentialsKey = await this.createCredentialsKey(username);
    const credentials = await this.credentialsService.getCredentialsAsync<MonobankCredentialsModel>(
      credentialsKey,
    );

    return credentials;
  }

  public async saveCredentialsAsync(username: string, credentialsModel: MonobankCredentialsModel) {
    const credentialsKey = await this.createCredentialsKey(username);

    this.logger.debug(`Saving ${username} credentials for ${IntegrationsEnum.MONO_BANK} to DB...`);
    await this.credentialsService.addCredentialsAsync(credentialsKey, credentialsModel);
  }

  private async createCredentialsKey(username: string) {
    const credentialsKey: CredentialsKey = {
      username: username,
      integrationName: IntegrationsEnum.MONO_BANK,
    };

    return credentialsKey;
  }
}
