import 'reflect-metadata';
import { randomUUID } from 'crypto';
import type { Event } from '../classes/event';
import {
  EVENT_METADATA_KEY,
  EVENTS_HANDLER_METADATA_KEY,
} from '../consts/metadata-keys';

/**
 * Decorator that marks a class as a event handler. An event handler
 * handles events executed by your application code.
 *
 * The decorated class must implement the `IEventsHandler` interface.
 *
 * @param events one or more event *types* to be handled by this handler.
 * @param options injectable options passed on to the "@Injectable" decorator.
 *
 *
 * @publicApi
 */
export const EventsHandler = (
  ...events: (Event | (new (...args: unknown[]) => Event))[]
): ClassDecorator => {
  return (target: Function) => {
    events.forEach((event) => {
      if (!Reflect.hasOwnMetadata(EVENT_METADATA_KEY, event)) {
        const metadataValue = { id: randomUUID() };
        Reflect.defineMetadata(EVENT_METADATA_KEY, metadataValue, event);
      }
    });

    Reflect.defineMetadata(EVENTS_HANDLER_METADATA_KEY, events, target);
  };
};
