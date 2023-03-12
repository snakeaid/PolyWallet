import { HttpStatus, Injectable } from '@nestjs/common';
import { MonobankCredentialsModel } from './monobank-credentials.model';
import { CredentialsService } from '../credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { IntegrationsEnum } from '../../shared/enums/integrations.enum';
import { firstValueFrom } from 'rxjs';
import { ScopeLogger } from '../logger/scope-logger';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MonobankService {
  private readonly logger: ScopeLogger;
  private readonly baseURL = 'https://api.monobank.ua';

  public constructor(
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
    loggerService: LoggerService,
  ) {
    loggerService.setContext(MonobankService.name);
    this.logger = loggerService.toScopeLogger(null);
  }

  public async authenticate(username: string, credentialsModel: MonobankCredentialsModel) {
    const response = await this.getClientInfo(credentialsModel.token);
    if (response.status === HttpStatus.OK) {
      this.logger.debug(
        `${username} credentials for ${IntegrationsEnum.MONO_BANK} are valid. Adding to the DB...`,
      );
      await this.credentialsService.addCredentialsAsync(
        {
          username: username,
          integrationName: IntegrationsEnum.MONO_BANK,
        },
        credentialsModel,
      );
    }
  }

  public async getClientInfo(token: string) {
    const path = '/personal/client-info';
    const response = await this.getRequest(path, token);

    return response;
  }

  private async getRequest(path: string, token: string, body?: string) {
    const response = await this.request('get', path, token, body);

    return response;
  }

  private async postRequest(path: string, token: string, body?: string) {
    const response = await this.request('post', path, token, body);

    return response;
  }

  private async request(method: string, path: string, token: string, body?: string) {
    const url = this.baseURL + path;

    const response = await firstValueFrom(
      this.httpService.request({
        method: method,
        url: url,
        headers: {
          'X-Token': token,
        },
        data: body,
      }),
    );

    return response;
  }
}
