import { randomUUID, UUID } from 'node:crypto';
import { ValueObject } from 'src/core/domain/value-object';

export class Uuid extends ValueObject<UUID> {
  public static generate(): Uuid {
    const id = randomUUID();
    return new Uuid(id);
  }

  public static create(): Uuid {
    
  }
}
