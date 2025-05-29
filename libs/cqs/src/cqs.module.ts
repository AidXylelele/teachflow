import {
  DynamicModule,
  Inject,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  COMMAND_DISPATCHER_KEY,
  EVENTS_DISPATHCER_KEY,
  EXPLORER_SERVICE_KEY,
  QUERY_DISPATCHER_KEY,
} from './cqs.di-tokens';
import { ExplorerService } from './services/explorer.service';
import { CommandDispatcher } from './dispatchers/command-dispatcher';
import { QueryDispatcher } from './dispatchers/query-dispatcher';
import { EventsDispatcher } from './dispatchers/events-dispatcher';
import {
  ICommandDispatcher,
  IEventsDispatcher,
  IExplorerService,
  IQueryDispatcher,
} from './interfaces';

@Module({
  providers: [
    {
      provide: COMMAND_DISPATCHER_KEY,
      useClass: CommandDispatcher,
    },
    { provide: QUERY_DISPATCHER_KEY, useClass: QueryDispatcher },
    { provide: EVENTS_DISPATHCER_KEY, useClass: EventsDispatcher },
    { provide: EXPLORER_SERVICE_KEY, useClass: ExplorerService },
  ],
  exports: [
    COMMAND_DISPATCHER_KEY,
    QUERY_DISPATCHER_KEY,
    EVENTS_DISPATHCER_KEY,
  ],
})
export class CqsModule implements OnApplicationBootstrap {
  public constructor(
    @Inject(EXPLORER_SERVICE_KEY)
    private readonly explorerService: IExplorerService,
    @Inject(COMMAND_DISPATCHER_KEY)
    private readonly commandDispatcher: ICommandDispatcher,
    @Inject(QUERY_DISPATCHER_KEY)
    private readonly queryDispatcher: IQueryDispatcher,
    @Inject(EVENTS_DISPATHCER_KEY)
    private readonly eventsDispatcher: IEventsDispatcher,
  ) {}

  public static forRoot(): DynamicModule {
    return {
      module: CqsModule,
      global: true,
    };
  }

  public onApplicationBootstrap(): void {
    const handlers = this.explorerService.explore();
    this.eventsDispatcher.register(handlers.events);
    this.commandDispatcher.register(handlers.commands);
    this.queryDispatcher.register(handlers.queries);
  }
}
