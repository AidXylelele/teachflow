/**
 * @publicApi
 */
export class EventsDispatcherIsFrozenException extends Error {
  constructor() {
    super('Events dispatcher is already initialized.');
  }
}
