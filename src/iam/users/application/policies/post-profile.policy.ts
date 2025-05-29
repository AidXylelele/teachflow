import { UserIdentity } from '../../../common/domain/user-identity/user-identity';
import { PostProfile } from '../../domain/entities/post-profile';

export class PostProfilePolicy {
  public static updatePostProfile(
    post: PostProfile,
    identity: UserIdentity,
  ): boolean {
    return post.ownerId.value === identity.id;
  }
}
