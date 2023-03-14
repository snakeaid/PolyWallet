import { AbstractCredentialsModel } from '../../../shared/abstractions/abstract-credentials.model';
import { IsNotEmpty, IsString } from 'class-validator';

export class MonobankCredentialsModel extends AbstractCredentialsModel {
  @IsNotEmpty()
  @IsString()
  public token: string;
}
