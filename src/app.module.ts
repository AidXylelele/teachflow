import { ClsModule } from '@app/cls';
import { CqsModule } from '@app/cqs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/user.module';
import { CaslModule } from 'libs/casl/casl.module';
import caslConfig from './configs/casl.config';
import mikroOrmConfig from './configs/mikro-orm.config';
import awsJwtVerifyConfig from './configs/aws-jwt-verify.config';
import webhooksConfig from './configs/webhooks.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [awsJwtVerifyConfig, webhooksConfig],
    }),
    ClsModule.forRoot(),
    CqsModule.forRoot(),
    CaslModule.register(caslConfig),
    MikroOrmModule.forRootAsync(mikroOrmConfig.asProvider()),
    UsersModule,
  ],
})
export class AppModule {}
