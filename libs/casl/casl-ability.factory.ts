import { Inject, Injectable } from '@nestjs/common';
import { CASL_MODULE_OPTIONS } from './casl.di-tokens';
import { CaslModuleOptions } from './interfaces/casl-module-options.interface';
import { AnyAbility, createMongoAbility } from '@casl/ability';
import { AuthedUser } from './interfaces/authed-user.interface';
import { interpolate } from './utils/interpolate';

@Injectable()
export class CaslAbilityFactory {
  public constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly moduleOptions: CaslModuleOptions,
  ) {}

  public createForUser<User extends AuthedUser = AuthedUser>(
    user: User,
  ): AnyAbility {
    const template = this.moduleOptions.roles[user.role];

    if (!template) {
      throw new Error('Roles permissions were not set.');
    }

    const permissions = interpolate(template, { user });
    return createMongoAbility(permissions);
  }
}

