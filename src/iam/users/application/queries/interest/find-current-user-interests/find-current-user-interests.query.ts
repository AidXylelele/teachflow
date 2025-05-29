import { Inject, Injectable } from '@nestjs/common';

import { Query } from 'src/common/application/query/query';
import { UserIdentityService } from 'src/common/application/user-identity/user-identity.service';
import { BASE_TOKEN, REPOSITORY_TOKEN } from 'src/common/di-tokens';
import { Uuid } from 'src/common/domain/value-object/uuid';
import { InterestsRepository } from 'src/user/application/ports/interests.repository';
import { InterestDto } from 'src/user/interfaces/http/dtos/interest/interest.dto';
import { SearchInterestsParamsDto } from 'src/user/interfaces/http/dtos/interest/search-interests-params.dto';

import {
  FindInterestsQueryInput,
  FindInterestsQueryOutput,
} from './find-current-user-interests-query.interfaces';
import { FindCurrentUserInterestsResponse } from './find-current-user-interests.response';

@Injectable()
export class FindCurrentUserInterestsQuery
  implements Query<SearchInterestsParamsDto, InterestDto[]>
{
  constructor(
    @Inject(REPOSITORY_TOKEN.INTERESTS_REPOSITORY)
    private readonly interestsRepository: InterestsRepository,
    @Inject(BASE_TOKEN.USER_IDENTITY_SERVICE)
    private readonly userIdentityService: UserIdentityService,
  ) {}

  async execute(
    _input: FindInterestsQueryInput,
  ): Promise<FindInterestsQueryOutput> {
    const identity = this.userIdentityService.getIdentity();
    const userId = new Uuid(identity.id);
    const interests = await this.interestsRepository.findAllByUserId(userId);
    const response = FindCurrentUserInterestsResponse.from(interests);
    return response.data;
  }
}
