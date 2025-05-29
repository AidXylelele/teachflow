import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ClsService } from './services/cls.service';
import { CLS_SERVICE_KEY } from './cls.di-tokens';
import { ClsMiddleware } from './middlewares/cls.middleware';

@Module({
  providers: [{ provide: CLS_SERVICE_KEY, useClass: ClsService }],
  exports: [CLS_SERVICE_KEY],
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
