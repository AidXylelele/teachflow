import { Command } from '@app/cqs';
import { ICommandHandler } from '@app/cqs/interfaces/command-handler.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export interface ICommandDispatcher {
  register(handlers?: Array<InstanceWrapper<ICommandHandler>>): void;
  execute<T extends object, R = void>(command: T): Promise<R>;
  execute<R = void>(command: Command<R>): Promise<R>;
}
