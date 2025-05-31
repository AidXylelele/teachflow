import { ValueObject } from 'src/core/domain/value-object';

export class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Email {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!EMAIL_REGEX.test(value)) {
      throw new Error(`Invalid email format. Received: "${value}"`);
    }

    return new Email(value);
  }
}
