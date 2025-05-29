import { Uuid } from 'src/common/domain/value-object/uuid';
import { Contact } from 'src/user/domain/entities/contact';

import { ContactAttributes } from '../schemas/contact.schema';

export class ContactMapper {
  public static toDomain(attributes: ContactAttributes): Contact {
    const props = {
      userId: attributes.user.id,
      ownerId: attributes.owner.id,
    };

    return Contact.of(attributes.id, props);
  }

  public static toAttributes(domain: Contact): ContactAttributes {
    return {
      id: domain.id,
      owner: { id: domain.ownerId.value as unknown as Uuid },
      user: { id: domain.userId.value as unknown as Uuid },
    };
  }
}
