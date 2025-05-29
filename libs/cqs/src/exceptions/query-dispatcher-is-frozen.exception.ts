/**
 * @publicApi
 */
export class QueryDispatcherIsFrozenException extends Error {
  constructor() {
    super('Query dispatcher is already initialized.');
  }
}
