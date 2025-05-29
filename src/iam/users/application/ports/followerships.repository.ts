import { Uuid } from 'src/common/domain/value-object/uuid';
import { Followership } from 'src/user/domain/entities/followership';

export interface FollowershipsRepository {
  delete(id: Uuid): Promise<void>;

  findById(id: Uuid): Promise<Followership>;

  save(domainObject: Followership): Promise<void>;

  findAllByUserId(userId: Uuid): Promise<Followership[]>;
}
