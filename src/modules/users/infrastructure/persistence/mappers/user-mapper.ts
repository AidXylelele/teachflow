import { IUserSchema } from '../schemas/user.schema';
import { User } from 'src/modules/users/domain/entities/user';

export class UserMapper {
  public static toDomain(data: IUserSchema): User {
    const props = {
      email: data.email,
      name: data.name,
      version: data.version,
    };

    return new User(data.id, props);
  }

  public static toPersistence(domain: User): IUserSchema {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      version: domain.version,
    };
  }
}
