import { AbstractCredentionalsModel } from '../../shared/abstractions/abstract-credentionals.model';
import { IsNotEmpty, IsString } from 'class-validator';

export class MonobankCredentialsModel extends AbstractCredentionalsModel {
  @IsNotEmpty()
  @IsString()
  public token: string;
}
