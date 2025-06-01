import { DataMapper } from 'src/core/infrastructure/data-mapper.interface';
import { User } from 'src/modules/users/domain/entities/user';
import { IUserSchema } from '../schemas/user.schema';

export class UserMapper implements DataMapper<User, IUserSchema> {
  public toDomain(data: IUserSchema): User {
    const props = {
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role,
      version: data.version,
    };

    return new User(data.id, props);
  }

  public toPersistence(domain: User): IUserSchema {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      role: domain.role,
      version: domain.version,
    };
  }
}
