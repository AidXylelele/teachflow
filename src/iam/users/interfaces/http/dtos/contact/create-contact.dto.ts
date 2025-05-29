import { IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateContactDto {
  @IsString()
  userId!: UUID;
}
