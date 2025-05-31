import { maxLength, minLength } from 'class-validator';
import { ValueObject } from 'src/core/classes/value-object';
import { ValidationFailedException } from 'src/core/exceptions/validation-failed.exception';

export class Name extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Name {
    if (!minLength(value, 2) || !maxLength(value, 100)) {
      throw new ValidationFailedException(
        'User name must be a string between 2 and 100 characters.',
      );
    }

    return new Name(value);
  }
}
