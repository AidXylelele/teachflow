export abstract class Entity<Id, Props> {
  readonly #id: Id;
  readonly #props: Props;

  public get id(): Id {
    return this.#id;
  }

  public get props(): Props {
    return this.#props;
  }

  protected constructor(id: Id, props: Props) {
    this.#id = id;
    this.#props = props;
  }
}
