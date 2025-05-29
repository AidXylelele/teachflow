import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Uuid } from 'src/common/domain/value-object/uuid';
import { BaseAttributes } from 'src/common/infrastructure/persistence/consts/base-schema-columns.const';
import { FollowershipsRepository } from 'src/user/application/ports/followerships.repository';
import { Followership } from 'src/user/domain/entities/followership';
import { Repository } from 'typeorm';

import { FollowershipMapper } from '../mappers/followership.mapper';
import {
  FollowershipAttributes,
  FollowershipEntitySchema,
} from '../schemas/followership.schema';

@Injectable()
export class TypeOrmFollowershipsRepository implements FollowershipsRepository {
  constructor(
    @InjectRepository(FollowershipEntitySchema)
    private readonly repository: Repository<
      BaseAttributes<FollowershipAttributes>
    >,
  ) {}

  public async findById(id: Uuid): Promise<Followership> {
    const options = { where: { id } };
    const contact = await this.repository.findOneOrFail(options);
    return FollowershipMapper.toDomain(contact);
  }

  public async findAllByUserId(userId: Uuid): Promise<Followership[]> {
    const options = { where: { owner: { id: userId } } };
    const interests = await this.repository.find(options);
    return interests.map(FollowershipMapper.toDomain);
  }

  public async save(domain: Followership): Promise<void> {
    const attributes = FollowershipMapper.toAttributes(domain);
    await this.repository.save(attributes);
  }

  public async delete(contactId: Uuid): Promise<void> {
    await this.repository.delete(contactId.value);
  }
}
