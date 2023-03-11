import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Credentials, CredentialsKey } from './credentials.interface';
import { AbstractCredentionalsModel } from '../../shared/abstractions/abstract-credentionals.model';

@Injectable()
export class CredentialsService {
  public constructor(
    @InjectModel(process.env.DYNAMO_TABLE_NAME)
    private readonly credentialsModel: Model<Credentials, CredentialsKey>,
  ) {}

  public async getCredentialsAsync<T extends AbstractCredentionalsModel>(
    key: CredentialsKey,
  ): Promise<T> {
    const credentialsItem = await this.credentialsModel.get(key);
    const credentialsJson = credentialsItem.credentials;
    const credentials: T = JSON.parse(credentialsJson);

    return credentials;
  }

  public async addCredentialsAsync(
    key: CredentialsKey,
    credentialsModel: AbstractCredentionalsModel,
  ): Promise<void> {
    const credentionals: Credentials = {
      username: key.username,
      integrationName: key.integrationName,
      credentials: JSON.stringify(credentialsModel),
    };

    await this.credentialsModel.create(credentionals);
  }
}
