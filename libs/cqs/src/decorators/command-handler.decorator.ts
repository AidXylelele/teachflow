import 'reflect-metadata';
import type { Command } from '../classes/command';
import {
  COMMAND_HANDLER_METADATA_KEY,
  COMMAND_METADATA_KEY,
} from '../consts/metadata-keys';
import { randomUUID } from 'node:crypto';

/**
 * Decorator that marks a class as a command handler. A command handler
 * handles commands (actions) executed by your application code.
 *
 * The decorated class must implement the `ICommandHandler` interface.
 *
 * @param command command *type* to be handled by this handler.
 * @param options injectable options passed on to the "@Injectable" decorator.
 *
 *
 * @publicApi
 */
export const CommandHandler = (
  command: Command | (new (...args: unknown[]) => Command),
): ClassDecorator => {
  return (target: Function) => {
    if (!Reflect.hasOwnMetadata(COMMAND_METADATA_KEY, command)) {
      const metadataValue = { id: randomUUID() };
      Reflect.defineMetadata(COMMAND_METADATA_KEY, metadataValue, command);
    }

    Reflect.defineMetadata(COMMAND_HANDLER_METADATA_KEY, command, target);
  };
};
