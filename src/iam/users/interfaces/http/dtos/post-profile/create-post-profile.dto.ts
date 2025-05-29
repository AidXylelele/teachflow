import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreatePostProfileDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  title!: string;

  @IsString()
  @MaxLength(2000)
  body!: string;

  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @IsUUID()
  categoryId!: UUID;

  @IsOptional()
  @IsBoolean()
  ageRestrictedContent?: boolean;
}
