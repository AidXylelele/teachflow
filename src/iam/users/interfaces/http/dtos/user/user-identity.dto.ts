import { IsString } from 'class-validator';

export class UserIdentityDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  dateOfBirth!: string;

  @IsString()
  gender!: string;
}
