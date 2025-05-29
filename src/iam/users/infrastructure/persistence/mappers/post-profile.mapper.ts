import { Uuid } from '../../../../common/domain/value-object/uuid';
import { PostProfile } from '../../../domain/entities/post-profile';
import { PostProfileAttributes } from '../schemas/post-profile.schema';

export class PostProfileMapper {
  static toDomain(attributes: PostProfileAttributes): PostProfile {
    return PostProfile.of(attributes.id, {
      ...attributes,
      ownerId: attributes.owner.id,
      categoryId: attributes.category.id,
    });
  }

  static toAttributes(domainPost: PostProfile): PostProfileAttributes {
    return {
      id: domainPost.id,
      title: domainPost.title,
      body: domainPost.body,
      tags: domainPost.tags,
      owner: { id: domainPost.ownerId.value as unknown as Uuid },
      category: { id: domainPost.categoryId.value as unknown as Uuid },
      ageRestricted: domainPost.ageRestricted,
      type: domainPost.type,
      status: domainPost.status,
      publishedAt: domainPost.publishedAt,
      createdAt: domainPost.createdAt,
      updatedAt: domainPost.updatedAt,
    };
  }
}
