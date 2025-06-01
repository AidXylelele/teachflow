import { Uuid } from 'src/core/domain/uuid';
import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/email';

export interface UsersRepository {
  findByEmail(email: Email): Promise<User>;

  findById(id: Uuid): Promise<User>;

  save(domain: User): Promise<void>;
}
