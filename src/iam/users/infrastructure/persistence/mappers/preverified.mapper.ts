import { Preverified } from '../../../domain/entities/preverified';
import { PreverifiedAttributes } from '../schemas/preverified.schema';

export class PreverifiedMapper {
  public static toDomain(attributes: PreverifiedAttributes): Preverified {
    const { id, ...props } = attributes;

    return Preverified.of(id, props);
  }

  public static toAttributes(domain: Preverified): PreverifiedAttributes {
    return {
      id: domain.id,
      email: domain.email,
    };
  }
}
