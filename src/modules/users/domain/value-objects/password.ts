import { ValueObject } from 'src/core/domain/value-object';

export class Password extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(hashedValue: string): Password {
    const SHA256_HASH_REGEX = /^[a-f0-9]{64}$/i;

    if (!SHA256_HASH_REGEX.test(hashedValue)) {
      throw new Error(
        `Invalid SHA256 hash format. Expected a 64-character hexadecimal string. Received: "${hashedValue}"`,
      );
    }

    return new Password(hashedValue);
  }
}
