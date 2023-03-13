import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MonobankAPI {
  private readonly baseURL = 'https://api.monobank.ua';

  public constructor(private readonly httpService: HttpService) {}

  public async getClientInfo(token: string) {
    const path = '/personal/client-info';
    const response = await this.getRequest(path, token);

    return response;
  }

  public async getStatement(account: string, from: number, to: number, token: string) {
    const path = `/personal/statement/${account}/${from}/${to}`;
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
