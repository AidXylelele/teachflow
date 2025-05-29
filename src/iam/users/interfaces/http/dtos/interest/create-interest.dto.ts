import { IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateInterestDto {
  @IsString()
  categoryId!: UUID;
}
