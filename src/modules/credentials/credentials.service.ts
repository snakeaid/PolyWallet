import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Credentials, CredentialsKey } from './credentials.interface';
import { AbstractCredentialsModel } from '../../shared/abstractions/abstract-credentials.model';

@Injectable()
export class CredentialsService {
  public constructor(
    @InjectModel(process.env.DYNAMO_TABLE_NAME)
    private readonly credentialsModel: Model<Credentials, CredentialsKey>,
  ) {}

  public async getCredentialsAsync<T extends AbstractCredentialsModel>(
    key: CredentialsKey,
  ): Promise<T | null> {
    const credentialsItem = await this.credentialsModel.get(key);

    if (credentialsItem) {
      const credentialsJson = credentialsItem.credentials;
      const credentials: T = JSON.parse(credentialsJson);

      return credentials;
    }

    return null;
  }

  public async addCredentialsAsync(
    key: CredentialsKey,
    credentialsModel: AbstractCredentialsModel,
  ): Promise<void> {
    const credentials: Credentials = {
      username: key.username,
      integrationName: key.integrationName,
      credentials: JSON.stringify(credentialsModel),
    };

    await this.credentialsModel.create(credentials);
  }
}
