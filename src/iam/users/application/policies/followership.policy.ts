import { Uuid } from 'src/common/domain/value-object/uuid';
import { Followership } from 'src/user/domain/entities/followership';

export class FollowershipPolicy {
  public static delete(followership: Followership, userId: Uuid): boolean {
    return followership.ownerId.equals(userId);
  }
}
