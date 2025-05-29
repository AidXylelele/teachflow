/**
 * @publicApi
 */
export class EventsHandlerNotFoundException extends Error {
  constructor(eventName: string) {
    super(`No handler found for the event: "${eventName}"`);
  }
}
