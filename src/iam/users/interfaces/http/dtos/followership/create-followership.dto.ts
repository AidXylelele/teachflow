import { IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateFollowershipDto {
  @IsString()
  userId!: UUID;
}
