import { Query } from '@app/cqs';
import { IQueryHandler } from '@app/cqs/interfaces/query-handler.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export interface IQueryDispatcher {
  register(handlers?: Array<InstanceWrapper<IQueryHandler>>): void;
  execute<T extends object, R = unknown>(query: T): Promise<R>;
  execute<R>(query: Query<R>): Promise<R>;
}
