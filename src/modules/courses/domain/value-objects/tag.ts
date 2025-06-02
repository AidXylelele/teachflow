import { ValueObject } from 'src/core/domain/value-object';

export class Tag extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Tag {
    const MIN_NAME_LENGTH = 3;
    const MAX_NAME_LENGTH = 50;

    if (typeof value !== 'string') {
      throw new Error('Tag must be a string.');
    }

    if (value.length < MIN_NAME_LENGTH) {
      throw new Error(
        `Tag must be at least ${MIN_NAME_LENGTH} characters long. Received: "${value}" (length: ${value.length})`,
      );
    }

    if (value.length > MAX_NAME_LENGTH) {
      throw new Error(
        `Tag must be at most ${MAX_NAME_LENGTH} characters long. Received: "${value}" (length: ${value.length})`,
      );
    }

    return new Tag(value);
  }
}
