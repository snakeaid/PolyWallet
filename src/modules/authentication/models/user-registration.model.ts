import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegistrationModel {
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
