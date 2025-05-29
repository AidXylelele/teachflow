import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Email } from 'src/common/domain/value-object/email';
import { BaseAttributes } from 'src/common/infrastructure/persistence/consts/base-schema-columns.const';
import { PreverifiedRepository } from 'src/user/application/ports/preverified.repository';
import { Repository } from 'typeorm';

import { Preverified } from '../../../domain/entities/preverified';
import { PreverifiedMapper } from '../mappers/preverified.mapper';
import {
  PreverifiedAttributes,
  PreverifiedEntitySchema,
} from '../schemas/preverified.schema';

@Injectable()
export class TypeOrmPreverifiedRepository implements PreverifiedRepository {
  constructor(
    @InjectRepository(PreverifiedEntitySchema)
    private readonly repository: Repository<
      BaseAttributes<PreverifiedAttributes>
    >,
  ) {}

  public async exists(userEmail: Email): Promise<boolean> {
    const options = { email: userEmail };
    return await this.repository.existsBy(options);
  }

  public async save(domain: Preverified): Promise<void> {
    const attributes = PreverifiedMapper.toAttributes(domain);
    await this.repository.save(attributes);
  }
}
