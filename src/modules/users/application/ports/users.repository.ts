import { Uuid } from 'src/common/domain/value-object/uuid';

import { User } from '../../domain/entities/user';

export interface UsersRepository {
  delete(userId: Uuid): Promise<void>;

  findById(userId: Uuid): Promise<User>;

  save(domainObject: User): Promise<void>;
}
