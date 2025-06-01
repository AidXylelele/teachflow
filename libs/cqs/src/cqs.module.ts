import { DynamicModule, Module, OnApplicationBootstrap } from '@nestjs/common';
import {
  COMMAND_DISPATCHER,
  EVENTS_DISPATHCER,
  QUERY_DISPATCHER,
} from './cqs.di-tokens';
import { ExplorerService } from './services/explorer.service';
import { CommandDispatcher } from './dispatchers/command-dispatcher';
import { QueryDispatcher } from './dispatchers/query-dispatcher';
import { EventsDispatcher } from './dispatchers/events-dispatcher';

@Module({
  providers: [
    { provide: COMMAND_DISPATCHER, useClass: CommandDispatcher },
    { provide: QUERY_DISPATCHER, useClass: QueryDispatcher },
    { provide: EVENTS_DISPATHCER, useClass: EventsDispatcher },
    EventsDispatcher,
    ExplorerService,
    QueryDispatcher,
    CommandDispatcher,
  ],
  exports: [COMMAND_DISPATCHER, QUERY_DISPATCHER, EVENTS_DISPATHCER],
})
export class CqsModule implements OnApplicationBootstrap {
  public constructor(
    private readonly explorerService: ExplorerService,
    private readonly commandDispatcher: CommandDispatcher,
    private readonly queryDispatcher: QueryDispatcher,
    private readonly eventsDispatcher: EventsDispatcher,
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
