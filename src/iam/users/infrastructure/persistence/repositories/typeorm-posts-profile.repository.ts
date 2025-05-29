import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Uuid } from '../../../../common/domain/value-object/uuid';
import { PostsProfileRepository } from '../../../application/ports/posts-profile.repository';
import { PostProfile } from '../../../domain/entities/post-profile';
import { PostProfileMapper } from '../mappers/post-profile.mapper';
import {
  PostProfileAttributes,
  PostProfileEntitySchema,
} from '../schemas/post-profile.schema';

@Injectable()
export class TypeormPostsProfileRepository implements PostsProfileRepository {
  constructor(
    @InjectRepository(PostProfileEntitySchema)
    private readonly repository: Repository<PostProfileAttributes>,
  ) {}

  async findById(id: Uuid): Promise<PostProfile> {
    const options = { where: { id } };
    const profilePost = await this.repository.findOneOrFail(options);
    return PostProfileMapper.toDomain(profilePost);
  }

  async save(domain: PostProfile): Promise<void> {
    const attributes = PostProfileMapper.toAttributes(domain);
    await this.repository.save(attributes);
  }
}
