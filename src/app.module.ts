import { ClsModule } from '@app/cls';
import { CqsModule } from '@app/cqs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClsModule.forRoot(),
    CqsModule.forRoot(),
    MikroOrmModule.forFeature(),
  ],
})
export class AppModule {}
