import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreatedEventDto {
  @IsUUID()
  public readonly id: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;
}
