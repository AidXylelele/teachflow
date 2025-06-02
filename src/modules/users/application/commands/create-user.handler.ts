import { CommandHandler } from '@app/cqs';
import { CreateUserCommand } from './create-user.command';
import { ICommandHandler } from '@app/cqs/interfaces/command-handler.interface';
import { IUsersRepository } from '../ports/users-repository.interface';
import { Inject } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../user.di-tokens';
import { Email } from '../../domain/value-objects/email';
import { User } from '../../domain/entities/user';
import { Uuid } from 'src/core/domain/uuid';
import { Name } from '../../domain/value-objects/name';
import { Transactional } from '@mikro-orm/core';

@CommandHandler(CreateUserCommand)
export class KillDragonHandler implements ICommandHandler<CreateUserCommand> {
  public constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUsersRepository,
  ) {}

  @Transactional()
  public async execute(command: CreateUserCommand): Promise<void> {
    const id = Uuid.create(command.id);
    const name = Name.create(command.name);
    const email = Email.create(command.email);
    const userExists = await this.repository.findByEmail(email);

    if (userExists) return;

    const user = User.create({ email, id, name });
    await this.repository.save(user);
  }
}
