import { ValueObject } from 'src/core/domain/value-object';

export class Name extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Name {
    const MIN_NAME_LENGTH = 2;
    const MAX_NAME_LENGTH = 100;

    if (typeof value !== 'string') {
      throw new Error('Name must be a string.');
    }

    if (value.length < MIN_NAME_LENGTH) {
      throw new Error(
        `Name must be at least ${MIN_NAME_LENGTH} characters long. Received: "${value}" (length: ${value.length})`,
      );
    }

    if (value.length > MAX_NAME_LENGTH) {
      throw new Error(
        `Name must be at most ${MAX_NAME_LENGTH} characters long. Received: "${value}" (length: ${value.length})`,
      );
    }

    return new Name(value);
  }
}
