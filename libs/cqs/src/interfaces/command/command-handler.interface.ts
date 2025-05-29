import type { Command } from '../../classes/command';

/**
 * Represents a command handler.
 * Command handlers are used to execute commands.
 *
 * @publicApi
 */
export type ICommandHandler<T extends Command = Command, Y = unknown> =
  T extends Command<infer I>
    ? {
        /**
         * Executes a command.
         * @param command The command to execute.
         */
        execute(command: T): Promise<I>;
      }
    : {
        /**
         * Executes a command.
         * @param command The command to execute.
         */
        execute(command: T): Promise<Y>;
      };
