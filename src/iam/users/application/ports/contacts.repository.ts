import { Uuid } from 'src/common/domain/value-object/uuid';
import { Contact } from 'src/user/domain/entities/contact';

export interface ContactsRepository {
  delete(id: Uuid): Promise<void>;

  findById(id: Uuid): Promise<Contact>;

  save(domainObject: Contact): Promise<void>;

  findAllByUserId(userId: Uuid): Promise<Contact[]>;
}
