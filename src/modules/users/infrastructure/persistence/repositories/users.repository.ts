import { EntityRepository } from '@mikro-orm/postgresql';
import { UsersRepository } from 'src/modules/users/application/ports/users-repository.interface';
import { IUserSchema, UserSchema } from '../schemas/user.schema';
import { Uuid } from 'src/core/domain/uuid';
import { User } from 'src/modules/users/domain/entities/user';
import { UserMapper } from '../mappers/user-mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Email } from 'src/modules/users/domain/value-objects/email';

@Injectable()
export class MikroOrmUsersRepository implements UsersRepository {
  readonly #mapper: UserMapper;
  readonly #repository: EntityRepository<IUserSchema>;

  public constructor(
    @InjectRepository(UserSchema)
    repository: EntityRepository<IUserSchema>,
  ) {
    this.#repository = repository;
    this.#mapper = new UserMapper();
  }

  public async findById(id: Uuid): Promise<User> {
    const user = await this.#repository.findOneOrFail({ id });

    return this.#mapper.toDomain(user);
  }

  public async findByEmail(email: Email): Promise<User> {
    const user = await this.#repository.findOneOrFail({ email });

    return this.#mapper.toDomain(user);
  }

  public async save(user: User): Promise<void> {
    const data = this.#mapper.toPersistence(user);
    const entity = await this.#repository.upsert(data);
    this.#repository.getEntityManager().persist(entity);
  }
}
