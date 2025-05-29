import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Query } from '../../classes/query';
import { IQueryHandler } from './query-handler.interface';

export interface IQueryDispatcher {
  register(handlers?: Array<InstanceWrapper<IQueryHandler>>): void;
  execute<R>(command: Query<R>): Promise<R>;
}
