import { Module } from '@nestjs/common';
import { USER_DAO, USERS_REPOSITORY } from './user.di-tokens';
import { UsersRepository } from './infrastructure/persistence/repositories/users.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserSchema } from './infrastructure/persistence/schemas/user.schema';
import { UsersWebhooksController } from './interfaces/http/users-webhooks.controller';
import { UserDao } from './infrastructure/persistence/daos/user.dao';
import { UsersController } from './interfaces/http/users.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserSchema])],
  controllers: [UsersWebhooksController, UsersController],
  providers: [
    { provide: USERS_REPOSITORY, useClass: UsersRepository },
    { provide: USER_DAO, useClass: UserDao },
  ],
})
export class UsersModule {}
