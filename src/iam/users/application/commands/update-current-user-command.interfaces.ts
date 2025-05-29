import { UUID } from 'crypto';
import { AddressProps } from 'src/common/domain/value-object/address';
import { GENDER } from 'src/user/domain/enums/gender';
import { PrivacySettingsProps } from 'src/user/domain/value-objects/privacy-settings';

export interface UpdateCurrentUserCommandInput {
  bio?: string;
  nickname?: string;
  address?: AddressProps;
  termsAccepted?: boolean;
  onboardingStep?: number;
  shortOnboardingStep?: number;
  privacySettings?: PrivacySettingsProps;
  identity?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: GENDER;
  };
}

export interface UpdateCurrentUserCommandOutput {
  id: UUID;
}
