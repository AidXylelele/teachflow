import type { Event } from './event';

export abstract class AggregateRoot<Id, Props> {
  readonly #id: Id;
  readonly #props: Props;
  #events: Event[];

  protected constructor(id: Id, props: Props) {
    this.#id = id;
    this.#props = props;
    this.#events = [];
  }

  public get id(): Id {
    return this.#id;
  }

  protected get props(): Props {
    return this.#props;
  }

  public pull(): ReadonlyArray<Event> {
    const events = this.#events;
    this.#events = [];
    return events;
  }

  protected record(event: Event): void {
    this.#events.push(event);
  }
}
