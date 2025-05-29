import { UUID } from 'crypto';
import { QueryResponse } from 'src/common/application/query/query-response';
import { AddressProps } from 'src/common/domain/value-object/address';
import { User } from 'src/user/domain/entities/user';
import { ACCOUNT_STATUS } from 'src/user/domain/enums/account-status';
import { VERIFICATION_STATUS } from 'src/user/domain/enums/verification-status';
import { PrivacySettingsProps } from 'src/user/domain/value-objects/privacy-settings';

export interface CurrentUserPrimitives {
  id: UUID;
  email: string;
  bio: string | null;
  gender: string | null;
  avatar: string | null;
  termsAccepted: boolean;
  onboardingStep: number;
  lastName: string | null;
  nickname: string | null;
  firstName: string | null;
  dateOfBirth: string | null;
  shortOnboardingStep: number;
  address: AddressProps | null;
  accountStatus: ACCOUNT_STATUS;
  privacySettings: PrivacySettingsProps;
  verificationStatus: VERIFICATION_STATUS;
}

export class FindCurrentUserResponse extends QueryResponse<CurrentUserPrimitives> {
  private constructor(user: CurrentUserPrimitives) {
    super(user);
  }

  static from(user: User): FindCurrentUserResponse {
    return new FindCurrentUserResponse({
      id: user.id.value,
      nickname: user.nickname?.value ?? null,
      email: user.email.value,
      bio: user.bio?.value ?? null,
      gender: user.gender?.value ?? null,
      avatar: user.avatar?.value ?? null,
      termsAccepted: user.termsAccepted,
      lastName: user.lastName?.value ?? null,
      firstName: user.firstName?.value ?? null,
      dateOfBirth: user.dateOfBirth?.value ?? null,
      address: user.address?.value ?? null,
      accountStatus: user.accountStatus.value,
      privacySettings: user.privacySettings.value,
      verificationStatus: user.verificationStatus.value,
      onboardingStep: user.onboardingStep,
      shortOnboardingStep: user.shortOnboardingStep,
    });
  }
}
