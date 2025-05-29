import { Inject, Injectable } from '@nestjs/common';

import { Command } from 'src/common/application/command/command';
import { UserIdentityService } from 'src/common/application/user-identity/user-identity.service';
import { BASE_TOKEN, REPOSITORY_TOKEN } from 'src/common/di-tokens';
import { Uuid } from 'src/common/domain/value-object/uuid';
import { DomainIdDto } from 'src/common/interfaces/http/dtos/domain-id.dto';
import { UsersRepository } from 'src/user/application/ports/users.repository';
import { UpdateCurrentUserDto } from 'src/user/interfaces/http/dtos/user/update-current-user.dto';
import { Transactional } from 'typeorm-transactional';

import {
  UpdateCurrentUserCommandInput,
  UpdateCurrentUserCommandOutput,
} from './update-current-user-command.interfaces';

@Injectable()
export class UpdateCurrentUserCommand
  implements Command<UpdateCurrentUserDto, DomainIdDto>
{
  constructor(
    @Inject(REPOSITORY_TOKEN.USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    @Inject(BASE_TOKEN.USER_IDENTITY_SERVICE)
    private readonly userIdentityService: UserIdentityService,
  ) {}

  @Transactional()
  public async execute(
    input: UpdateCurrentUserCommandInput,
  ): Promise<UpdateCurrentUserCommandOutput> {
    const identity = this.userIdentityService.getIdentity();
    const userId = new Uuid(identity.id);
    const user = await this.usersRepository.findById(userId);

    if (input.nickname) user.setNickname(input.nickname);

    if (input.bio) user.setBio(input.bio);

    if (input.address) user.setAddress(input.address);

    if (input.termsAccepted) user.acceptTerms();

    if (input.privacySettings) user.setPrivacySettings(input.privacySettings);

    if (input.identity) {
      user.setFirstName(input.identity.firstName);
      user.setLastName(input.identity.firstName);
      user.setDateOfBirth(input.identity.dateOfBirth);
      user.setGender(input.identity.gender);
    }

    if (input.onboardingStep) user.setOnboardingStep(input.onboardingStep);

    if (input.shortOnboardingStep)
      user.setShortOnboardingStep(input.shortOnboardingStep);

    await this.usersRepository.save(user);

    return { id: user.id.value };
  }
}
