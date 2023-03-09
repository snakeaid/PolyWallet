import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  public constructor(error?: string) {
    super('User with this username already exists', error);
  }
}
