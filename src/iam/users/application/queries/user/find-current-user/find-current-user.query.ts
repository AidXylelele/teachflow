import { Inject, Injectable } from '@nestjs/common';

import { Query } from 'src/common/application/query/query';
import { UserIdentityService } from 'src/common/application/user-identity/user-identity.service';
import { BASE_TOKEN, REPOSITORY_TOKEN } from 'src/common/di-tokens';
import { Uuid } from 'src/common/domain/value-object/uuid';
import { UsersRepository } from 'src/user/application/ports/users.repository';
import { UserDto } from 'src/user/interfaces/http/dtos/user/user.dto';

import {
  FindCurrentUserQueryInput,
  FindCurrentUserQueryOutput,
} from './find-current-user.interfaces';
import { FindCurrentUserResponse } from './find-current-user.response';

@Injectable()
export class FindCurrentUserQuery implements Query<void, UserDto> {
  constructor(
    @Inject(REPOSITORY_TOKEN.USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    @Inject(BASE_TOKEN.USER_IDENTITY_SERVICE)
    private readonly userIdentityService: UserIdentityService,
  ) {}

  async execute(
    _input: FindCurrentUserQueryInput,
  ): Promise<FindCurrentUserQueryOutput> {
    const identity = this.userIdentityService.getIdentity();
    const userId = new Uuid(identity.id);
    const user = await this.usersRepository.findById(userId);
    const response = FindCurrentUserResponse.from(user);
    return response.data;
  }
}
