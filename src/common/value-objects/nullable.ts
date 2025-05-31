import { ValueObject } from 'src/core/classes/value-object';

export class Nullable extends ValueObject<null> {
  private constructor() {
    super(null);
  }

  public static create(): Nullable {
    return new Nullable();
  }
}
