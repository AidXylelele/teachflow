import { isUUID } from 'class-validator';
import { randomUUID, UUID } from 'node:crypto';
import { ValueObject } from 'src/core/classes/value-object';
import { ValidationFailedException } from 'src/core/exceptions/validation-failed.exception';

export class Uuid extends ValueObject<UUID> {
  private constructor(value: UUID) {
    super(value);
  }

  public static generate(): Uuid {
    const id = randomUUID();
    return new Uuid(id);
  }

  public static create(value: UUID): Uuid {
    if (!isUUID(value)) {
      throw new ValidationFailedException('Must be a valid uuid');
    }

    return new Uuid(value);
  }
}
