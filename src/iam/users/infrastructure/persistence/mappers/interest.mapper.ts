import { Uuid } from 'src/common/domain/value-object/uuid';
import { Interest } from 'src/user/domain/entities/interest';

import { InterestAttributes } from '../schemas/interest.schema';

export class InterestMapper {
  public static toDomain(attributes: InterestAttributes): Interest {
    const props = {
      ownerId: attributes.owner.id,
      categoryId: attributes.category.id,
    };

    return Interest.of(attributes.id, props);
  }

  public static toAttributes(domain: Interest): InterestAttributes {
    return {
      id: domain.id,
      owner: { id: domain.ownerId.value as unknown as Uuid },
      category: { id: domain.categoryId.value as unknown as Uuid },
    };
  }
}
