import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { IEventsHandler } from './events-handler.interface';

export interface IEventsDispatcher {
  register(handlers?: Array<InstanceWrapper<IEventsHandler>>): void;
  execute(events: Array<Event>): Promise<void>;
}
