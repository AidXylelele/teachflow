import 'reflect-metadata';
import { Injectable, Logger, LoggerService, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Query } from '../classes';
import {
  QUERY_HANDLER_METADATA_KEY,
  QUERY_METADATA_KEY,
} from '../consts/metadata-keys';
import { QueryMetadata } from '../interfaces/query-metadata.interface';
import {
  InvalidQueryHandlerException,
  QueryDispatcherIsFrozenException,
  QueryHandlerNotFoundException,
} from '../exceptions';
import { IQueryHandler } from '../interfaces/query-handler.interface';

@Injectable()
export class QueryDispatcher {
  #isFrozen: boolean;
  readonly #logger: LoggerService;
  readonly #handlers: Map<string, <R>(query: Query<R>) => Promise<R>>;

  public constructor(private readonly moduleRef: ModuleRef) {
    this.#isFrozen = false;
    this.#handlers = new Map();
    this.#logger = new Logger(QueryDispatcher.name);
  }

  #bind(handler: InstanceWrapper<IQueryHandler>): void {
    const typeRef = handler.metatype as Type<IQueryHandler>;
    const queryId = this.#reflectQueryId(typeRef);

    if (this.#handlers.has(queryId)) {
      this.#logger.warn(
        `Query handler [${typeRef.name}] is already registered. Overriding previously registered handler.`,
      );
    }

    const options = { strict: false };
    const instance = this.moduleRef.get(typeRef, options);

    this.#handlers.set(queryId, <R>(query: Query<R>): Promise<R> => {
      return instance.execute(query) as Promise<R>;
    });
  }

  #reflectQueryId(handler: Type<IQueryHandler>): string {
    const query = Reflect.getMetadata(
      QUERY_HANDLER_METADATA_KEY,
      handler,
    ) as Type<Query>;

    const metadata = Reflect.getMetadata(QUERY_METADATA_KEY, query) as
      | QueryMetadata
      | undefined;

    if (!metadata) {
      throw new InvalidQueryHandlerException();
    }

    return metadata.id;
  }

  #getQueryId(query: Query): string {
    const metadata = Reflect.getMetadata(
      QUERY_METADATA_KEY,
      query.constructor,
    ) as QueryMetadata | undefined;

    if (!metadata) {
      throw new QueryHandlerNotFoundException(query.constructor.name);
    }

    return metadata.id;
  }

  public register(handlers: Array<InstanceWrapper<IQueryHandler>> = []): void {
    if (this.#isFrozen) {
      throw new QueryDispatcherIsFrozenException();
    }

    handlers.forEach((handler) => this.#bind(handler));
    this.#isFrozen = true;
  }

  public execute<R>(query: Query<R>): Promise<R> {
    const queryId = this.#getQueryId(query);
    const handler = this.#handlers.get(queryId);

    if (!handler) {
      throw new QueryHandlerNotFoundException(query.constructor.name);
    }

    return handler(query);
  }
}
