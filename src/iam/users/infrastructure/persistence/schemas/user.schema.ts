import { Address } from 'src/common/domain/value-object/address';
import { AwsS3ObjectKey } from 'src/common/domain/value-object/aws-s3-object-key';
import { Email } from 'src/common/domain/value-object/email';
import { Nickname } from 'src/common/domain/value-object/nickname';
import { Uuid } from 'src/common/domain/value-object/uuid';
import {
  BaseAttributes,
  BaseSchemaColumns,
} from 'src/common/infrastructure/persistence/consts/base-schema-columns.const';
import { ENTITY_SCHEMA_NAME } from 'src/common/infrastructure/persistence/enums/entity-schema-name.enum';
import { ENTITY_SCHEMA_TABLE_NAME } from 'src/common/infrastructure/persistence/enums/entity-schema-table-name.enum';
import { ValueObjectTransformer } from 'src/common/infrastructure/persistence/utils/value-object-transformer';
import { ACCOUNT_STATUS } from 'src/user/domain/enums/account-status';
import { GENDER } from 'src/user/domain/enums/gender';
import { VERIFICATION_STATUS } from 'src/user/domain/enums/verification-status';
import { AccountStatus } from 'src/user/domain/value-objects/account-status';
import { Bio } from 'src/user/domain/value-objects/bio';
import { DateOfBirth } from 'src/user/domain/value-objects/date-of-birth';
import { FirstName } from 'src/user/domain/value-objects/first-name';
import { Gender } from 'src/user/domain/value-objects/gender';
import { LastName } from 'src/user/domain/value-objects/last-name';
import { PrivacySettings } from 'src/user/domain/value-objects/privacy-settings';
import { VerificationStatus } from 'src/user/domain/value-objects/verification-status';
import { EntitySchema } from 'typeorm';

export type UserAttributes = {
  id: Uuid;
  email: Email;
  gender: Gender | null;
  lastName: LastName | null;
  dateOfBirth: DateOfBirth | null;
  firstName: FirstName | null;
  termsAccepted: boolean;
  nickname: Nickname | null;
  address: Address | null;
  avatar: AwsS3ObjectKey | null;
  bio: Bio;
  accountStatus: AccountStatus;
  verificationStatus: VerificationStatus;
  privacySettings: PrivacySettings;
  onboardingStep: number;
  shortOnboardingStep: number;
};

export const UserEntitySchema = new EntitySchema<
  BaseAttributes<UserAttributes>
>({
  columns: {
    ...BaseSchemaColumns,
    accountStatus: {
      default: ACCOUNT_STATUS.ACTIVE,
      enum: ACCOUNT_STATUS,
      name: 'account_status',
      type: 'enum',
      transformer: new ValueObjectTransformer(AccountStatus),
    },
    email: {
      length: 320,
      type: 'varchar',
      unique: true,
      name: 'email',
      transformer: new ValueObjectTransformer(Email),
    },
    avatar: {
      default: null,
      name: 'avatar',
      nullable: true,
      type: 'text',
      transformer: new ValueObjectTransformer(AwsS3ObjectKey),
    },
    address: {
      type: 'json',
      nullable: true,
      default: null,
      name: 'address',
      transformer: new ValueObjectTransformer(Address),
    },
    bio: {
      length: 500,
      default: '',
      name: 'bio',
      type: 'varchar',
      transformer: new ValueObjectTransformer(Bio),
    },
    nickname: {
      length: 256,
      nullable: true,
      type: 'varchar',
      unique: true,
      name: 'nickname',
      transformer: new ValueObjectTransformer(Nickname),
    },
    termsAccepted: {
      default: false,
      name: 'terms_accepted',
      type: 'boolean',
    },
    verificationStatus: {
      default: VERIFICATION_STATUS.UNVERIFIED,
      enum: VERIFICATION_STATUS,
      name: 'verification_status',
      type: 'enum',
      transformer: new ValueObjectTransformer(VerificationStatus),
    },
    dateOfBirth: {
      default: null,
      name: 'date_of_birth',
      nullable: true,
      type: 'timestamp',
      transformer: new ValueObjectTransformer(DateOfBirth),
    },
    firstName: {
      default: null,
      length: 256,
      name: 'first_name',
      nullable: true,
      type: 'varchar',
      transformer: new ValueObjectTransformer(FirstName),
    },
    gender: {
      default: null,
      enum: GENDER,
      nullable: true,
      type: 'enum',
      name: 'gender',
      transformer: new ValueObjectTransformer(Gender),
    },
    lastName: {
      default: null,
      length: 256,
      name: 'last_name',
      nullable: true,
      type: 'varchar',
      transformer: new ValueObjectTransformer(LastName),
    },
    onboardingStep: {
      type: 'smallint',
      default: 0,
    },
    shortOnboardingStep: {
      type: 'smallint',
      default: 0,
    },
    privacySettings: {
      name: 'privacy_settings',
      type: 'json',
      default: '{"firstName":"PUBLIC","lastName":"PUBLIC"}',
      transformer: new ValueObjectTransformer(PrivacySettings),
    },
  },
  name: ENTITY_SCHEMA_NAME.USER,
  tableName: ENTITY_SCHEMA_TABLE_NAME.USER,
});
