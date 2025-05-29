import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ICommandHandler } from './command-handler.interface';
import { Command } from '../../classes/command';

export interface ICommandDispatcher {
  register(handlers?: Array<InstanceWrapper<ICommandHandler>>): void;
  execute<R>(command: Command<R>): Promise<R>;
}
