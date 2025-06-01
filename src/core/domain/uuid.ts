import { randomUUID } from 'node:crypto';
import { ValueObject } from 'src/core/domain/value-object';

export class Uuid extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static generate(): Uuid {
    const id = randomUUID();
    return new Uuid(id);
  }

  public static create(value: string): Uuid {
    const UUID_REGEX =
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    if (!UUID_REGEX.test(value)) {
      throw new Error('Must be a valid uuid');
    }

    return new Uuid(value);
  }
}
