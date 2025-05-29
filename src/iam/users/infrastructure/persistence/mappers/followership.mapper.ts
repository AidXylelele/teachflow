import { Uuid } from 'src/common/domain/value-object/uuid';
import { Followership } from 'src/user/domain/entities/followership';

import { FollowershipAttributes } from '../schemas/followership.schema';

export class FollowershipMapper {
  public static toDomain(attributes: FollowershipAttributes): Followership {
    const props = {
      userId: attributes.user.id,
      ownerId: attributes.owner.id,
    };

    return Followership.of(attributes.id, props);
  }

  public static toAttributes(domain: Followership): FollowershipAttributes {
    return {
      id: domain.id,
      owner: { id: domain.ownerId.value as unknown as Uuid },
      user: { id: domain.userId.value as unknown as Uuid },
    };
  }
}
