import 'reflect-metadata';
import { Injectable, Logger, LoggerService, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Command } from '../classes';
import {
  COMMAND_HANDLER_METADATA_KEY,
  COMMAND_METADATA_KEY,
} from '../consts/metadata-keys';
import { CommandMetadata } from '../interfaces/command-metadata.interface';
import {
  CommandDispatcherIsFrozenException,
  CommandHandlerNotFoundException,
  InvalidCommandHandlerException,
} from '../exceptions';
import { ICommandHandler } from '../interfaces/command-handler.interface';

@Injectable()
export class CommandDispatcher {
  #isFrozen: boolean;
  readonly #logger: LoggerService;
  readonly #handlers: Map<string, <R>(command: Command<R>) => Promise<R>>;

  public constructor(private readonly moduleRef: ModuleRef) {
    this.#isFrozen = false;
    this.#handlers = new Map();
    this.#logger = new Logger(CommandDispatcher.name);
  }

  #bind(handler: InstanceWrapper<ICommandHandler>): void {
    const typeRef = handler.metatype as Type<ICommandHandler>;
    const commandId = this.#reflectCommandId(typeRef);

    if (this.#handlers.has(commandId)) {
      this.#logger.warn(
        `Command handler [${typeRef.name}] is already registered. Overriding previously registered handler.`,
      );
    }

    const options = { strict: false };
    const instance = this.moduleRef.get(typeRef, options);

    this.#handlers.set(commandId, <R>(command: Command<R>): Promise<R> => {
      return instance.execute(command) as Promise<R>;
    });
  }

  #reflectCommandId(handler: Type<ICommandHandler>): string {
    const command = Reflect.getMetadata(
      COMMAND_HANDLER_METADATA_KEY,
      handler,
    ) as Type<Command>;

    const metadata = Reflect.getMetadata(COMMAND_METADATA_KEY, command) as
      | CommandMetadata
      | undefined;

    if (!metadata) {
      throw new InvalidCommandHandlerException();
    }

    return metadata.id;
  }

  #getCommandId(command: Command): string {
    const metadata = Reflect.getMetadata(
      COMMAND_METADATA_KEY,
      command.constructor,
    ) as CommandMetadata | undefined;

    if (!metadata) {
      throw new CommandHandlerNotFoundException(command.constructor.name);
    }

    return metadata.id;
  }

  public register(
    handlers: Array<InstanceWrapper<ICommandHandler>> = [],
  ): void {
    if (this.#isFrozen) {
      throw new CommandDispatcherIsFrozenException();
    }

    handlers.forEach((handler) => this.#bind(handler));
    this.#isFrozen = true;
  }

  public execute<R>(command: Command<R>): Promise<R> {
    const commandId = this.#getCommandId(command);
    const handler = this.#handlers.get(commandId);

    if (!handler) {
      throw new CommandHandlerNotFoundException(command.constructor.name);
    }

    return handler(command);
  }
}
