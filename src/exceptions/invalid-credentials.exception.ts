import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialsException extends BadRequestException {
  public constructor(message, error?: string) {
    super(message, error);
  }
}
