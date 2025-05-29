import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/common/interfaces/http/dtos/address.dto';

import { UserIdentityDto } from './user-identity.dto';
import { UserPrivacySettingsDto } from './user-privacy-settings.dto';

export class UpdateCurrentUserDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsBoolean()
  termsAccepted?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserIdentityDto)
  identity?: UserIdentityDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserPrivacySettingsDto)
  privacySettings?: UserPrivacySettingsDto;
}
