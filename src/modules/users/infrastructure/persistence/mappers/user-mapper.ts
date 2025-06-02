import { Uuid } from 'src/core/domain/uuid';
import { UserModel } from '../schemas/user.schema';
import { User } from 'src/modules/users/domain/entities/user';
import { Email } from 'src/modules/users/domain/value-objects/email';
import { Name } from 'src/modules/users/domain/value-objects/name';

export class UserMapper {
  public static toDomain(data: UserModel): User {
    const id = Uuid.create(data.id);

    const props = {
      email: Email.create(data.email),
      name: Name.create(data.name),
      version: data.version,
    };

    return new User(id, props);
  }

  public static toPersistence(domain: User): UserModel {
    return {
      id: domain.id.value,
      name: domain.name.value,
      email: domain.email.value,
      version: domain.version,
    };
  }
}
