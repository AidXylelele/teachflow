import { Inject, Injectable } from '@nestjs/common';

import { Query } from 'src/common/application/query/query';
import { UserIdentityService } from 'src/common/application/user-identity/user-identity.service';
import { BASE_TOKEN, REPOSITORY_TOKEN } from 'src/common/di-tokens';
import { Uuid } from 'src/common/domain/value-object/uuid';
import { ContactsRepository } from 'src/user/application/ports/contacts.repository';
import { ContactDto } from 'src/user/interfaces/http/dtos/contact/contact.dto';
import { SearchContactsParamsDto } from 'src/user/interfaces/http/dtos/contact/search-contacts-params.dto';

import {
  FindContactsQueryInput,
  FindContactsQueryOutput,
} from './find-current-user-contacts-query.interfaces';
import { FindCurrentUserContactsResponse } from './find-current-user-contacts.response';

@Injectable()
export class FindCurrentUserContactsQuery
  implements Query<SearchContactsParamsDto, ContactDto[]>
{
  constructor(
    @Inject(REPOSITORY_TOKEN.CONTACTS_REPOSITORY)
    private readonly contactsRepository: ContactsRepository,
    @Inject(BASE_TOKEN.USER_IDENTITY_SERVICE)
    private readonly userIdentityService: UserIdentityService,
  ) {}

  async execute(
    _input: FindContactsQueryInput,
  ): Promise<FindContactsQueryOutput> {
    const identity = this.userIdentityService.getIdentity();
    const userId = new Uuid(identity.id);
    const contacts = await this.contactsRepository.findAllByUserId(userId);
    const response = FindCurrentUserContactsResponse.from(contacts);
    return response.data;
  }
}
