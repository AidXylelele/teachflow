import { maxLength, minLength } from 'class-validator';
import { ValueObject } from 'src/core/classes/value-object';

export class Title extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Title {
    if (!minLength(value, 2) || !maxLength(value, 250)) {
      throw new Error(
        'Role title  must be a string between 2 and 250 characters.',
      );
    }

    return new Title(value);
  }
}
