import { isHash } from 'class-validator';
import { ValueObject } from 'src/core/classes/value-object';
import { ValidationFailedException } from 'src/core/exceptions/validation-failed.exception';

export class Password extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Password {
    if (!isHash(value, 'sha256')) {
      throw new ValidationFailedException(
        'Password must be a valid hash string',
      );
    }
    return new Password(value);
  }
}
