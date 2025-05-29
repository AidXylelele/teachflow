import { PartialType, PickType } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { CreatePostProfileDto } from './create-post-profile.dto';

export class UpdatePostProfileDto extends PickType(
  PartialType(CreatePostProfileDto),
  ['ageRestrictedContent'],
) {
  @IsUUID()
  id!: UUID;
}
