import * as isEqual from 'fast-deep-equal/es6';

export abstract class ValueObject<T> {
  readonly #value: T;

  public constructor(value: T) {
    this.validate(value);
    this.#value = value;
  }

  public get value(): T {
    return this.#value;
  }

  protected abstract validate(value: T): void;

  public equals(other: ValueObject<T>): boolean {
    return isEqual(this.#value, other.value);
  }
}
