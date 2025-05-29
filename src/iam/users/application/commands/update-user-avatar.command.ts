import { Inject, Injectable } from '@nestjs/common';

import { Command } from 'src/common/application/command/command';
import { REPOSITORY_TOKEN } from 'src/common/di-tokens';
import { Uuid } from 'src/common/domain/value-object/uuid';
import { UpdateUserAvatarDto } from 'src/user/interfaces/sqs/dtos/update-user-avatar.dto';
import { Transactional } from 'typeorm-transactional';

import { UsersRepository } from '../ports/users.repository';
import {
  UpdateUserAvatarCommandInput,
  updateUserAvatarCommandOutput,
} from './update-user-avatar-command.interfaces';

@Injectable()
export class UpdateUserAvatarCommand
  implements Command<UpdateUserAvatarDto, void>
{
  constructor(
    @Inject(REPOSITORY_TOKEN.USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  @Transactional()
  public async execute(
    input: UpdateUserAvatarCommandInput,
  ): Promise<updateUserAvatarCommandOutput> {
    const userId = new Uuid(input.entityId);
    const user = await this.usersRepository.findById(userId);
    user.setAvatar(input.fileKey);
    await this.usersRepository.save(user);
  }
}
