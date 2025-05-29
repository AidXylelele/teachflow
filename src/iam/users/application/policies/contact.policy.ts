import { Uuid } from 'src/common/domain/value-object/uuid';

import { Contact } from '../../domain/entities/contact';

export class ContactPolicy {
  public static delete(contact: Contact, userId: Uuid): boolean {
    return contact.ownerId.equals(userId);
  }
}
