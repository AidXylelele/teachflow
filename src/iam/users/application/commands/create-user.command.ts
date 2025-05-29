import { Inject, Injectable } from '@nestjs/common';

import { Command } from 'src/common/application/command/command';
import { UserIdentityService } from 'src/common/application/user-identity/user-identity.service';
import { BASE_TOKEN, REPOSITORY_TOKEN } from 'src/common/di-tokens';
import { Email } from 'src/common/domain/value-object/email';
import { DomainIdDto } from 'src/common/interfaces/http/dtos/domain-id.dto';
import { UsersRepository } from 'src/user/application/ports/users.repository';
import { User } from 'src/user/domain/entities/user';
import { Transactional } from 'typeorm-transactional';

import { PreverifiedRepository } from '../ports/preverified.repository';
import {
  CreateUserCommandInput,
  CreateUserCommandOutput,
} from './create-user-command.interfaces';

@Injectable()
export class CreateUserCommand implements Command<void, DomainIdDto> {
  constructor(
    @Inject(REPOSITORY_TOKEN.USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    @Inject(REPOSITORY_TOKEN.PREVERIFIED_REPOSITORY)
    private readonly preverifiedRepository: PreverifiedRepository,
    @Inject(BASE_TOKEN.USER_IDENTITY_SERVICE)
    private readonly userIdentityService: UserIdentityService,
  ) {}

  @Transactional()
  public async execute(
    _input: CreateUserCommandInput,
  ): Promise<CreateUserCommandOutput> {
    const identity = this.userIdentityService.getIdentity();
    const email = new Email(identity.email);
    const isPreverified = await this.preverifiedRepository.exists(email);
    const user = User.create(identity.id, identity.email, isPreverified);
    await this.usersRepository.save(user);

    return { id: user.id.value };
  }
}
