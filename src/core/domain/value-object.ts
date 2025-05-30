import * as isEqual from 'fast-deep-equal/es6';

export abstract class ValueObject<T> {
  readonly #value: T;

  protected constructor(value: T) {
    this.#value = value;
  }

  public get value(): T {
    return this.#value;
  }

  public equals(other: ValueObject<T>): boolean {
    return isEqual(this.#value, other.value);
  }
}
