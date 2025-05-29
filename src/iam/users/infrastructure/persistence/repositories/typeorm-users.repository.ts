import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Uuid } from 'src/common/domain/value-object/uuid';
import { BaseAttributes } from 'src/common/infrastructure/persistence/consts/base-schema-columns.const';
import { UsersRepository } from 'src/user/application/ports/users.repository';
import { User } from 'src/user/domain/entities/user';
import { Repository } from 'typeorm';

import { UserMapper } from '../mappers/user.mapper';
import { UserAttributes, UserEntitySchema } from '../schemas/user.schema';

@Injectable()
export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntitySchema)
    private readonly repository: Repository<BaseAttributes<UserAttributes>>,
  ) {}

  public async findById(id: Uuid): Promise<User> {
    const options = { where: { id } };
    const user = await this.repository.findOneOrFail(options);
    return UserMapper.toDomain(user);
  }

  public async save(domain: User): Promise<void> {
    const attributes = UserMapper.toAttributes(domain);
    await this.repository.save(attributes);
  }

  public async delete(userId: Uuid): Promise<void> {
    await this.repository.delete(userId.value);
  }
}
