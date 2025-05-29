import type { Event } from '../../classes/event';

/**
 * Represents an event handler.
 */
export interface IEventsHandler<T extends Event = Event> {
  /**
   * Handles an event.
   * @param event The event to handle.
   */
  handle(event: T): unknown;
}
