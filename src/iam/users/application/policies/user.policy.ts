import { User } from 'src/user/domain/entities/user';

export class UserPolicy {
  public static updateIdentity(user: User): boolean {
    return !user.verificationStatus.isVerified;
  }
}
