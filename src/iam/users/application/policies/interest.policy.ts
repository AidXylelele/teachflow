import { Uuid } from 'src/common/domain/value-object/uuid';

import { Interest } from '../../domain/entities/interest';

export class InterestPolicy {
  public static delete(interest: Interest, userId: Uuid): boolean {
    return interest.ownerId.equals(userId);
  }
}
