import { ClsModule } from '@app/cls';
import { CqsModule } from '@app/cqs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/user.module';
import { CaslModule } from 'libs/casl/casl.module';
import caslConfig from './configs/casl.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClsModule.forRoot(),
    CqsModule.forRoot(),
    CaslModule.register(caslConfig),
    MikroOrmModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
