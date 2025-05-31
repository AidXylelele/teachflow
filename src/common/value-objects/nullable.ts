import { ValueObject } from 'src/core/domain/value-object';

export class Nullable extends ValueObject<null> {
  private constructor() {
    super(null);
  }

  public static create(): Nullable {
    return new Nullable();
  }
}
