import { User } from 'src/user/domain/entities/user';

import { UserAttributes } from '../schemas/user.schema';

export class UserMapper {
  public static toDomain(attributes: UserAttributes): User {
    const props = {
      nickname: attributes.nickname,
      email: attributes.email,
      avatar: attributes.avatar,
      bio: attributes.bio,
      termsAccepted: attributes.termsAccepted,
      accountStatus: attributes.accountStatus,
      verificationStatus: attributes.verificationStatus,
      privacySettings: attributes.privacySettings,
      address: attributes.address,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      gender: attributes.gender,
      dateOfBirth: attributes.dateOfBirth,
      onboardingStep: attributes.onboardingStep,
      shortOnboardingStep: attributes.shortOnboardingStep,
    };

    return User.of(attributes.id, props);
  }

  static toAttributes(domain: User): UserAttributes {
    return {
      id: domain.id,
      email: domain.email,
      nickname: domain.nickname,
      firstName: domain.firstName,
      lastName: domain.lastName,
      dateOfBirth: domain.dateOfBirth,
      gender: domain.gender,
      avatar: domain.avatar,
      bio: domain.bio,
      termsAccepted: domain.termsAccepted,
      accountStatus: domain.accountStatus,
      verificationStatus: domain.verificationStatus,
      address: domain.address,
      privacySettings: domain.privacySettings,
      onboardingStep: domain.onboardingStep,
      shortOnboardingStep: domain.shortOnboardingStep,
    };
  }
}
