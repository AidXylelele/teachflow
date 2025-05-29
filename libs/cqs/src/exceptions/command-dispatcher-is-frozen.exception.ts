/**
 * @publicApi
 */
export class CommandDispatcherIsFrozenException extends Error {
  constructor() {
    super('Command dispatcher is already initialized.');
  }
}
