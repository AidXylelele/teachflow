import { IsString } from 'class-validator';

export class UserPrivacySettingsDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}
