import { Injectable, Logger, LoggerService, Type } from '@nestjs/common';
import 'reflect-metadata';
import { IEventsDispatcher, IEventsHandler } from '../interfaces';
import { ModuleRef } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import {
  EVENT_METADATA_KEY,
  EVENTS_HANDLER_METADATA_KEY,
} from '../consts/metadata-keys';
import { EventMetadata } from '../interfaces/event/event-metadata.interface';
import {
  EventsDispatcherIsFrozenException,
  EventsHandlerNotFoundException,
  InvalidEventsHandlerException,
} from '../exceptions';

@Injectable()
export class EventsDispatcher implements IEventsDispatcher {
  #isFrozen: boolean;
  readonly #logger: LoggerService;
  readonly #handlers: Map<string, (event: Event) => unknown>;

  public constructor(private readonly moduleRef: ModuleRef) {
    this.#isFrozen = false;
    this.#handlers = new Map();
    this.#logger = new Logger(EventsDispatcher.name);
  }

  #bind(handler: InstanceWrapper<IEventsHandler>): void {
    const typeRef = handler.metatype as Type<IEventsHandler>;
    const eventId = this.#reflectEventId(typeRef);

    if (this.#handlers.has(eventId)) {
      this.#logger.warn(
        `Events handler [${typeRef.name}] is already registered. Overriding previously registered handler.`,
      );
    }

    const options = { strict: false };
    const instance = this.moduleRef.get(typeRef, options);

    this.#handlers.set(eventId, (event: Event) => {
      return instance.handle(event);
    });
  }

  #reflectEventId(handler: Type<IEventsHandler>): string {
    const event = Reflect.getMetadata(
      EVENTS_HANDLER_METADATA_KEY,
      handler,
    ) as Type<Event>;

    const metadata = Reflect.getMetadata(EVENT_METADATA_KEY, event) as
      | EventMetadata
      | undefined;

    if (!metadata) {
      throw new InvalidEventsHandlerException();
    }

    return metadata.id;
  }

  #getEventId(event: Event): string {
    const metadata = Reflect.getMetadata(
      EVENT_METADATA_KEY,
      event.constructor,
    ) as EventMetadata | undefined;

    if (!metadata) {
      throw new EventsHandlerNotFoundException(event.constructor.name);
    }

    return metadata.id;
  }

  public register(handlers: Array<InstanceWrapper<IEventsHandler>> = []): void {
    if (this.#isFrozen) {
      throw new EventsDispatcherIsFrozenException();
    }

    handlers.forEach((handler) => this.#bind(handler));
    this.#isFrozen = true;
  }

  public async execute(events: Array<Event>): Promise<void> {
    const executions = events.map((event) => {
      const eventId = this.#getEventId(event);
      const handler = this.#handlers.get(eventId);

      if (!handler) {
        throw new EventsHandlerNotFoundException(event.constructor.name);
      }

      return handler(event);
    });

    await Promise.all(executions);
  }
}
