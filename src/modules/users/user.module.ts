import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  COMMAND_TOKEN,
  QUERY_TOKEN,
  REPOSITORY_TOKEN,
} from 'src/common/di-tokens';

import { CreateContactCommand } from './application/commands/contact/create-contact.command';
import { DeleteContactCommand } from './application/commands/contact/delete-contact.command';
import { CreateFollowershipCommand } from './application/commands/followership/create-followership.command';
import { DeleteFollowershipCommand } from './application/commands/followership/delete-followership.command';
import { CreateInterestCommand } from './application/commands/interest/create-interest.command';
import { DeleteInterestCommand } from './application/commands/interest/delete-interest.command';
import { CreatePostProfileCommand } from './application/commands/post-profile/create-post-profile.command';
import { UpdatePostProfileCommand } from './application/commands/post-profile/update-post-profile.command';
import { CreateUserCommand } from './application/commands/create-user.command';
import { UpdateCurrentUserCommand } from './application/commands/update-current-user.command';
import { UpdateUserAvatarCommand } from './application/commands/update-user-avatar.command';
import { FindCurrentUserContactsQuery } from './application/queries/contact/find-current-user-contacts/find-current-user-contacts.query';
import { FindCurrentUserInterestsQuery } from './application/queries/interest/find-current-user-interests/find-current-user-interests.query';
import { FindCurrentUserQuery } from './application/queries/user/find-current-user/find-current-user.query';
import { TypeOrmContactsRepository } from './infrastructure/persistence/repositories/typeorm-contacts.repository';
import { TypeOrmFollowershipsRepository } from './infrastructure/persistence/repositories/typeorm-followerships.repository';
import { TypeOrmInterestsRepository } from './infrastructure/persistence/repositories/typeorm-interests.repository';
import { TypeormPostsProfileRepository } from './infrastructure/persistence/repositories/typeorm-posts-profile.repository';
import { TypeOrmPreverifiedRepository } from './infrastructure/persistence/repositories/typeorm-preverified.repository';
import { TypeOrmUsersRepository } from './infrastructure/persistence/repositories/typeorm-users.repository';
import { ContactEntitySchema } from './infrastructure/persistence/schemas/contact.schema';
import { FollowershipEntitySchema } from './infrastructure/persistence/schemas/followership.schema';
import { InterestEntitySchema } from './infrastructure/persistence/schemas/interest.schema';
import { PostProfileEntitySchema } from './infrastructure/persistence/schemas/post-profile.schema';
import { PreverifiedEntitySchema } from './infrastructure/persistence/schemas/preverified.schema';
import { UserEntitySchema } from './infrastructure/persistence/schemas/user.schema';
import { PostsProfileController } from './interfaces/http/posts-profile.controller';
import { UsersController } from './interfaces/http/users.controller';
import { UsersSqsController } from './interfaces/sqs/users.controller';

@Module({
  controllers: [UsersController, UsersSqsController, PostsProfileController],
  imports: [
    TypeOrmModule.forFeature([
      UserEntitySchema,
      InterestEntitySchema,
      ContactEntitySchema,
      FollowershipEntitySchema,
      PreverifiedEntitySchema,
      PostProfileEntitySchema,
    ]),
  ],
  providers: [
    { provide: COMMAND_TOKEN.CREATE_USER, useClass: CreateUserCommand },
    {
      provide: COMMAND_TOKEN.UPDATE_USER_AVATAR,
      useClass: UpdateUserAvatarCommand,
    },
    {
      provide: COMMAND_TOKEN.UPDATE_CURRENT_USER,
      useClass: UpdateCurrentUserCommand,
    },
    { provide: QUERY_TOKEN.FIND_CURRENT_USER, useClass: FindCurrentUserQuery },
    {
      provide: REPOSITORY_TOKEN.USERS_REPOSITORY,
      useClass: TypeOrmUsersRepository,
    },
    { provide: COMMAND_TOKEN.CREATE_INTEREST, useClass: CreateInterestCommand },
    { provide: COMMAND_TOKEN.DELETE_INTEREST, useClass: DeleteInterestCommand },
    {
      provide: QUERY_TOKEN.FIND_CURRENT_USER_INTERESTS,
      useClass: FindCurrentUserInterestsQuery,
    },
    {
      provide: REPOSITORY_TOKEN.INTERESTS_REPOSITORY,
      useClass: TypeOrmInterestsRepository,
    },
    {
      provide: REPOSITORY_TOKEN.FOLLOWERSHIPS_REPOSITORY,
      useClass: TypeOrmFollowershipsRepository,
    },
    {
      provide: COMMAND_TOKEN.CREATE_FOLLOWERSHIP,
      useClass: CreateFollowershipCommand,
    },
    {
      provide: COMMAND_TOKEN.DELETE_FOLLOWERSHIP,
      useClass: DeleteFollowershipCommand,
    },
    { provide: COMMAND_TOKEN.CREATE_CONTACT, useClass: CreateContactCommand },
    { provide: COMMAND_TOKEN.DELETE_CONTACT, useClass: DeleteContactCommand },
    {
      provide: QUERY_TOKEN.FIND_CURRENT_USER_CONTACTS,
      useClass: FindCurrentUserContactsQuery,
    },
    {
      provide: REPOSITORY_TOKEN.CONTACTS_REPOSITORY,
      useClass: TypeOrmContactsRepository,
    },
    {
      provide: REPOSITORY_TOKEN.CONTACTS_REPOSITORY,
      useClass: TypeOrmContactsRepository,
    },
    {
      provide: REPOSITORY_TOKEN.PREVERIFIED_REPOSITORY,
      useClass: TypeOrmPreverifiedRepository,
    },
    {
      provide: REPOSITORY_TOKEN.POST_PROFILE_REPOSITORY,
      useClass: TypeormPostsProfileRepository,
    },
    {
      provide: COMMAND_TOKEN.CREATE_POST_PROFILE,
      useClass: CreatePostProfileCommand,
    },
    {
      provide: COMMAND_TOKEN.UPDATE_POST_PROFILE_COMMAND,
      useClass: UpdatePostProfileCommand,
    },
  ],
})
export class UsersModule {}
