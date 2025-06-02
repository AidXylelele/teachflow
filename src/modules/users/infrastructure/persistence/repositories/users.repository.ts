import { EntityRepository } from '@mikro-orm/postgresql';
import { UsersRepository } from 'src/modules/users/application/ports/users-repository.interface';
import { IUserSchema, UserSchema } from '../schemas/user.schema';
import { Uuid } from 'src/core/domain/uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Email } from 'src/modules/users/domain/value-objects/email';
import { User } from 'src/modules/users/domain/entities/user';
import { UserMapper } from '../mappers/user-mapper';

@Injectable()
export class MikroOrmUsersRepository implements UsersRepository {
  public constructor(
    @InjectRepository(UserSchema)
    private readonly repository: EntityRepository<IUserSchema>,
  ) {}

  public async findByIdOrFail(id: Uuid): Promise<User> {
    const user = await this.repository.findOneOrFail({ id });

    return UserMapper.toDomain(user);
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const user = await this.repository.findOne({ email });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  public async save(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);
    const entity = await this.repository.upsert(data);
    this.repository.getEntityManager().persist(entity);
  }
}
