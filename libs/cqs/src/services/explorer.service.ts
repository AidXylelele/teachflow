import { Injectable } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import {
  COMMAND_HANDLER_METADATA_KEY,
  EVENTS_HANDLER_METADATA_KEY,
  QUERY_HANDLER_METADATA_KEY,
} from '../consts/metadata-keys';
import { ProvidersIntrospectionResult } from '../interfaces/providers-introspection-result.interface';
import { IQueryHandler } from '../interfaces/query-handler.interface';
import { IEventsHandler } from '../interfaces/events-handler.interface';
import { ICommandHandler } from '../interfaces/command-handler.interface';

@Injectable()
export class ExplorerService {
  public constructor(private readonly container: ModulesContainer) {}

  public explore(): ProvidersIntrospectionResult {
    const queries = this.#getByKey<IQueryHandler>(QUERY_HANDLER_METADATA_KEY);
    const events = this.#getByKey<IEventsHandler>(EVENTS_HANDLER_METADATA_KEY);
    const commands = this.#getByKey<ICommandHandler>(
      COMMAND_HANDLER_METADATA_KEY,
    );

    return { commands, queries, events };
  }

  #getByKey<T>(metadataKey: string): InstanceWrapper<T>[] {
    return [...this.container.values()]
      .flatMap((moduleRef) => [...moduleRef.providers.values()])
      .filter((wrapper): wrapper is InstanceWrapper<T> =>
        this.#hasMetadata(wrapper, metadataKey),
      );
  }

  #hasMetadata<T>(wrapper: InstanceWrapper<T>, metadataKey: string): boolean {
    const target = wrapper.instance?.constructor;
    return !!target && Reflect.hasMetadata(metadataKey, target);
  }
}
