import { FindOptionsRelations } from 'typeorm';

import { Uuid } from '../../../common/domain/value-object/uuid';
import { PostProfile } from '../../domain/entities/post-profile';

export interface PostsProfileRepository {
  save(domainObject: PostProfile): Promise<void>;

  findById(
    id: Uuid,
    relations?: FindOptionsRelations<PostProfile>,
  ): Promise<PostProfile>;
}
