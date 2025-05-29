import { UUID } from 'crypto';
import { AddressDto } from 'src/common/interfaces/http/dtos/address.dto';
import { ACCOUNT_STATUS } from 'src/user/domain/enums/account-status';
import { VERIFICATION_STATUS } from 'src/user/domain/enums/verification-status';

import { UserPrivacySettingsDto } from './user-privacy-settings.dto';

export class UserDto {
  id!: UUID;
  email!: string;
  bio!: string | null;
  gender!: string | null;
  avatar!: string | null;
  termsAccepted!: boolean;
  onboardingStep!: number;
  lastName!: string | null;
  nickname!: string | null;
  firstName!: string | null;
  dateOfBirth!: string | null;
  shortOnboardingStep!: number;
  address!: AddressDto | null;
  accountStatus!: ACCOUNT_STATUS;
  privacySettings!: UserPrivacySettingsDto;
  verificationStatus!: VERIFICATION_STATUS;
}
