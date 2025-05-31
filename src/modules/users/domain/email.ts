import { isEmail } from 'class-validator';
import { ValueObject } from 'src/core/classes/value-object';
import { ValidationFailedException } from 'src/core/exceptions/validation-failed.exception';

export class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Email {
    if (!isEmail(value)) {
      throw new ValidationFailedException('Invalid value for email');
    }

    return new Email(value);
  }
}
