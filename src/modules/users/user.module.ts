import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from './user.di-tokens';
import { MikroOrmUsersRepository } from './infrastructure/persistence/repositories/users.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserSchema } from './infrastructure/persistence/schemas/user.schema';
import { UsersWebhooksController } from './interfaces/http/users-webhooks.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserSchema])],
  controllers: [UsersWebhooksController],
  providers: [{ provide: USERS_REPOSITORY, useClass: MikroOrmUsersRepository }],
})
export class UsersModule {}
