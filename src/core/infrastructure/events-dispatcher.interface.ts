import { Event } from '@app/cqs';
import { IEventsHandler } from '@app/cqs/interfaces/events-handler.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export interface IEventsDispatcher {
  register(handlers?: Array<InstanceWrapper<IEventsHandler>>): void;
  execute(events: Array<Event>): Promise<void>;
}
