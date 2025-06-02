import { Uuid } from 'src/core/domain/uuid';
import { Email } from '../../domain/value-objects/email';
import { User } from '../../domain/entities/user';

export interface UsersRepository {
  findByEmail(email: Email): Promise<User | null>;

  findByIdOrFail(id: Uuid): Promise<User>;

  save(domain: User): Promise<void>;
}
