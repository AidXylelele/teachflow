import { IUsersRepository } from 'src/modules/users/application/ports/users-repository.interface';
import { Uuid } from 'src/core/domain/uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Email } from 'src/modules/users/domain/value-objects/email';
import { User } from 'src/modules/users/domain/entities/user';
import { UserMapper } from '../mappers/user.mapper';
import { USER_DAO } from 'src/modules/users/user.di-tokens';
import { IUserDao } from 'src/modules/users/application/ports/user-dao.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  public constructor(@Inject(USER_DAO) private readonly dao: IUserDao) {}

  public async findByIdOrFail(id: Uuid): Promise<User> {
    const model = await this.dao.findOneByIdOrFail(id.value);
    return UserMapper.toDomain(model);
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const model = await this.dao.findOneByEmail(email.value);

    if (!model) return null;

    return UserMapper.toDomain(model);
  }

  public async save(user: User): Promise<void> {
    const model = UserMapper.toPersistence(user);
    await this.dao.persist(model);
  }
}
