import { UUID } from 'crypto';
import { QueryResponse } from 'src/common/application/query/query-response';
import { Contact } from 'src/user/domain/entities/contact';

interface ContactPrimitives {
  id: UUID;
  userId: UUID;
}

export class FindCurrentUserContactsResponse extends QueryResponse<
  ContactPrimitives[]
> {
  private constructor(interests: ContactPrimitives[]) {
    super(interests);
  }

  static from(contacts: Contact[]): FindCurrentUserContactsResponse {
    return new FindCurrentUserContactsResponse(
      contacts.map((contact: Contact) => ({
        id: contact.id.value,
        userId: contact.userId.value,
      })),
    );
  }
}
