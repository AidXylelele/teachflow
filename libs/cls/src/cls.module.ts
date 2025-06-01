import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ClsService } from './services/async-local-storage.service';
import { CLS_SERVICE } from './cls.di-tokens';
import { ClsMiddleware } from './middlewares/cls.middleware';

@Module({
  providers: [{ provide: CLS_SERVICE, useClass: ClsService }],
  exports: [CLS_SERVICE],
})
export class ClsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ClsMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }

  public static forRoot(): DynamicModule {
    return {
      module: ClsModule,
      global: true,
    };
  }
}
