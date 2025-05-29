import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Uuid } from 'src/common/domain/value-object/uuid';
import { BaseAttributes } from 'src/common/infrastructure/persistence/consts/base-schema-columns.const';
import { ContactsRepository } from 'src/user/application/ports/contacts.repository';
import { Contact } from 'src/user/domain/entities/contact';
import { Repository } from 'typeorm';

import { ContactMapper } from '../mappers/contact.mapper';
import {
  ContactAttributes,
  ContactEntitySchema,
} from '../schemas/contact.schema';

@Injectable()
export class TypeOrmContactsRepository implements ContactsRepository {
  constructor(
    @InjectRepository(ContactEntitySchema)
    private readonly repository: Repository<BaseAttributes<ContactAttributes>>,
  ) {}

  public async findById(id: Uuid): Promise<Contact> {
    const options = { where: { id } };
    const contact = await this.repository.findOneOrFail(options);
    return ContactMapper.toDomain(contact);
  }

  public async findAllByUserId(userId: Uuid): Promise<Contact[]> {
    const options = { where: { owner: { id: userId } } };
    const interests = await this.repository.find(options);
    return interests.map(ContactMapper.toDomain);
  }

  public async save(domain: Contact): Promise<void> {
    const attributes = ContactMapper.toAttributes(domain);
    await this.repository.save(attributes);
  }

  public async delete(contactId: Uuid): Promise<void> {
    await this.repository.delete(contactId.value);
  }
}
