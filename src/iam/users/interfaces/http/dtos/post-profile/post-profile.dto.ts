import { UUID } from 'crypto';

import { CategoryDto } from '../../../../../category/interfaces/http/dtos/category.dto';
import { POST_PROFILE_STATUS } from '../../../../domain/enums/post-profile-status';
import { POST_PROFILE_TYPE } from '../../../../domain/enums/post-profile-type';
import { UserDto } from '../user/user.dto';

export class PostProfileDto {
  id!: UUID;
  title!: string;
  body!: string;
  tags!: string[];
  owner!: UserDto;
  category!: CategoryDto;
  ageRestricted!: boolean;
  type!: POST_PROFILE_TYPE;
  status!: POST_PROFILE_STATUS;
}
