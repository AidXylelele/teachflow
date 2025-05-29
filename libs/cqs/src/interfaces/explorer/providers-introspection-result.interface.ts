import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { IEventsHandler } from '../event/events-handler.interface';
import { IQueryHandler } from '../query/query-handler.interface';
import { ICommandHandler } from '../command/command-handler.interface';

export interface ProvidersIntrospectionResult {
  events?: InstanceWrapper<IEventsHandler>[];
  queries?: InstanceWrapper<IQueryHandler>[];
  commands?: InstanceWrapper<ICommandHandler>[];
}
