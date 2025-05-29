import { UUID } from 'crypto';
import { AggregateRoot } from 'src/common/domain/aggregate/aggregate-root';
import { AwsS3ObjectKey } from 'src/common/domain/value-object/aws-s3-object-key';
import { Email } from 'src/common/domain/value-object/email';
import { Nickname } from 'src/common/domain/value-object/nickname';
import { Uuid } from 'src/common/domain/value-object/uuid';

import {
  Address,
  AddressProps,
} from '../../../common/domain/value-object/address';
import { ACCOUNT_STATUS } from '../enums/account-status';
import { GENDER } from '../enums/gender';
import { VERIFICATION_STATUS } from '../enums/verification-status';
import { VISIBILITY_POLICY } from '../enums/visibility-policy';
import { AccountStatus } from '../value-objects/account-status';
import { Bio } from '../value-objects/bio';
import { DateOfBirth } from '../value-objects/date-of-birth';
import { FirstName } from '../value-objects/first-name';
import { Gender } from '../value-objects/gender';
import { LastName } from '../value-objects/last-name';
import {
  PrivacySettings,
  PrivacySettingsProps,
} from '../value-objects/privacy-settings';
import { VerificationStatus } from '../value-objects/verification-status';

interface UserProps {
  bio: Bio;
  email: Email;
  gender: Gender | null;
  termsAccepted: boolean;
  onboardingStep: number;
  address: Address | null;
  lastName: LastName | null;
  nickname: Nickname | null;
  firstName: FirstName | null;
  shortOnboardingStep: number;
  accountStatus: AccountStatus;
  avatar: AwsS3ObjectKey | null;
  dateOfBirth: DateOfBirth | null;
  privacySettings: PrivacySettings;
  verificationStatus: VerificationStatus;
}

export class User extends AggregateRoot<UserProps> {
  public get firstName(): FirstName | null {
    return this.props.firstName;
  }

  public get lastName(): LastName | null {
    return this.props.lastName;
  }

  public get gender(): Gender | null {
    return this.props.gender;
  }

  public get dateOfBirth(): DateOfBirth | null {
    return this.props.dateOfBirth;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get address(): Address | null {
    return this.props.address;
  }

  public get bio(): Bio {
    return this.props.bio;
  }

  public get termsAccepted(): boolean {
    return this.props.termsAccepted;
  }

  public get nickname(): Nickname | null {
    return this.props.nickname;
  }

  public get avatar(): AwsS3ObjectKey | null {
    return this.props.avatar;
  }

  public get accountStatus(): AccountStatus {
    return this.props.accountStatus;
  }

  public get privacySettings(): PrivacySettings {
    return this.props.privacySettings;
  }

  public get verificationStatus(): VerificationStatus {
    return this.props.verificationStatus;
  }

  public get onboardingStep(): number {
    return this.props.onboardingStep;
  }

  public get shortOnboardingStep(): number {
    return this.props.shortOnboardingStep;
  }

  public static create(
    identityId: UUID,
    email: string,
    isVerified: boolean,
  ): User {
    const id = new Uuid(identityId);

    const props = {
      firstName: null,
      lastName: null,
      gender: null,
      dateOfBirth: null,
      termsAccepted: false,
      onboardingStep: 0,
      shortOnboardingStep: 0,
      nickname: null,
      avatar: null,
      address: null,
      bio: new Bio(''),
      email: new Email(email),
      verificationStatus: isVerified
        ? new VerificationStatus(VERIFICATION_STATUS.VERIFIED)
        : new VerificationStatus(VERIFICATION_STATUS.UNVERIFIED),
      accountStatus: new AccountStatus(ACCOUNT_STATUS.ACTIVE),
      privacySettings: new PrivacySettings({
        firstName: VISIBILITY_POLICY.PUBLIC,
        lastName: VISIBILITY_POLICY.PUBLIC,
      }),
    };

    return new User(id, props);
  }

  public static of(id: Uuid, props: UserProps): User {
    return new User(id, props);
  }

  public acceptTerms(): void {
    this.props.termsAccepted = true;
  }

  public setBio(text: string): void {
    this.props.bio = new Bio(text);
  }

  public setAvatar(key: string): void {
    this.props.avatar = new AwsS3ObjectKey(key);
  }

  public setNickname(nickname: string): void {
    this.props.nickname = new Nickname(nickname);
  }

  public setFirstName(firstName: string): void {
    this.props.firstName = new FirstName(firstName);
  }

  public setLastName(lastName: string): void {
    this.props.lastName = new LastName(lastName);
  }

  public setDateOfBirth(dateOfBirth: string): void {
    this.props.dateOfBirth = new DateOfBirth(dateOfBirth);
  }

  public setGender(gender: GENDER): void {
    this.props.gender = new Gender(gender);
  }

  public setAddress(addressProps: AddressProps): void {
    this.props.address = new Address(addressProps);
  }

  public setPrivacySettings(settings: PrivacySettingsProps): void {
    this.props.privacySettings = new PrivacySettings(settings);
  }

  public setOnboardingStep(step: number): void {
    this.props.onboardingStep = step;
  }

  public setShortOnboardingStep(step: number): void {
    this.props.shortOnboardingStep = step;
  }
}
