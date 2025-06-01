import { Module } from '@nestjs/common';
import { AUTH_SERVICE, USERS_REPOSITORY } from './user.di-tokens';
import { MikroOrmUsersRepository } from './infrastructure/persistence/repositories/users.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserSchema } from './infrastructure/persistence/schemas/user.schema';
import { JwtAuthService } from './infrastructure/coginto/jwt.';

@Module({
  imports: [MikroOrmModule.forFeature([UserSchema])],
  providers: [
    { provide: USERS_REPOSITORY, useClass: MikroOrmUsersRepository },
    { provide: AUTH_SERVICE, useClass: JwtAuthService },
  ],
})
export class UsersModule {}
