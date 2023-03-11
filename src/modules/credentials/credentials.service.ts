import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Credentials, CredentialsKey } from './credentials.interface';

@Injectable()
export class CredentialsService {
  public constructor(
    @InjectModel(process.env.DYNAMO_TABLE_NAME)
    private readonly credentialsModel: Model<Credentials, CredentialsKey>,
  ) {}

  public async getCredentialsAsync<T>(key: CredentialsKey): Promise<T> {
    const credentialsItem = await this.credentialsModel.get(key);
    const credentialsJson = credentialsItem.credentials;
    const credentials: T = JSON.parse(credentialsJson);

    return credentials;
  }
}
