import 'reflect-metadata';
import {
  QUERY_HANDLER_METADATA_KEY,
  QUERY_METADATA_KEY,
} from '../consts/metadata-keys';
import { randomUUID } from 'node:crypto';

/**
 * Decorator that marks a class as a query handler. A query handler
 * handles queries executed by your application code.
 *
 * The decorated class must implement the `IQueryHandler` interface.
 *
 * @param query query *type* to be handled by this handler.
 * @param options injectable options passed on to the "@Injectable" decorator.
 *
 *
 * @publicApi
 */
export const QueryHandler = (query: object): ClassDecorator => {
  return (target: Function) => {
    if (!Reflect.hasOwnMetadata(QUERY_METADATA_KEY, query)) {
      const metadataValue = { id: randomUUID() };
      Reflect.defineMetadata(QUERY_METADATA_KEY, metadataValue, query);
    }

    Reflect.defineMetadata(QUERY_HANDLER_METADATA_KEY, query, target);
  };
};
