import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { IUserDao } from 'src/modules/users/application/ports/user-dao.interface';
import { UserModel, UserSchema } from '../schemas/user.schema';

@Injectable()
export class UserDao implements IUserDao {
  public constructor(private readonly em: EntityManager) {}

  public async findOneByEmail(email: string): Promise<UserModel | null> {
    return await this.em.findOne(UserSchema, { email });
  }
  public async findOneByIdOrFail(id: string): Promise<UserModel> {
    return await this.em.findOneOrFail(UserSchema, { id });
  }

  public async persist(model: UserModel): Promise<void> {
    const entity = await this.em.upsert(UserSchema, model);
    this.em.persist(entity);
  }
}
