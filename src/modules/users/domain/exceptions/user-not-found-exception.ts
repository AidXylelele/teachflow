import { NotFoundException } from '@nestjs/common';

export class InvalidCredentialsException extends NotFoundException {
  public constructor() {
    super(`User not found.`);
  }
}
