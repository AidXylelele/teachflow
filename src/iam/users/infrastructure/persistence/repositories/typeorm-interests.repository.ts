import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Uuid } from 'src/common/domain/value-object/uuid';
import { BaseAttributes } from 'src/common/infrastructure/persistence/consts/base-schema-columns.const';
import { InterestsRepository } from 'src/user/application/ports/interests.repository';
import { Interest } from 'src/user/domain/entities/interest';
import { Repository } from 'typeorm';

import { InterestMapper } from '../mappers/interest.mapper';
import {
  InterestAttributes,
  InterestEntitySchema,
} from '../schemas/interest.schema';

@Injectable()
export class TypeOrmInterestsRepository implements InterestsRepository {
  constructor(
    @InjectRepository(InterestEntitySchema)
    private readonly repository: Repository<BaseAttributes<InterestAttributes>>,
  ) {}

  public async findById(id: Uuid): Promise<Interest> {
    const options = { where: { id } };
    const interest = await this.repository.findOneOrFail(options);
    return InterestMapper.toDomain(interest);
  }

  public async findAllByUserId(userId: Uuid): Promise<Interest[]> {
    const options = { where: { owner: { id: userId } } };
    const interests = await this.repository.find(options);
    return interests.map(InterestMapper.toDomain);
  }

  public async save(domain: Interest): Promise<void> {
    const attributes = InterestMapper.toAttributes(domain);
    await this.repository.save(attributes);
  }

  public async delete(interestId: Uuid): Promise<void> {
    await this.repository.delete(interestId.value);
  }
}
