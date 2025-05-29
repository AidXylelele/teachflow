import type { Query } from '../../classes/query';

/**
 * Represents a query handler.
 *
 * @publicApi
 */
export type IQueryHandler<T extends Query = Query, Y = unknown> =
  T extends Query<infer I>
    ? {
        /**
         * Executes a query.
         * @param query The query to execute.
         */
        execute(query: T): Promise<I>;
      }
    : {
        /**
         * Executes a query.
         * @param query The query to execute.
         */
        execute(query: T): Promise<Y>;
      };
