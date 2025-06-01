import { Inject, Injectable } from '@nestjs/common';
import { CaslRoles } from './interfaces';
import { CASL_MODULE_OPTIONS } from './casl.di-tokens';
import { CaslModuleOptions } from './interfaces/casl-module-options.interface';
import { AnyAbility, createMongoAbility } from '@casl/ability';
import { AuthedUser } from './interfaces/authed-user.interface';
import { interpolate } from './utils/interpolate';

@Injectable()
export class CaslAbilityFactory {
  readonly #roles: CaslRoles;

  public constructor(@Inject(CASL_MODULE_OPTIONS) options: CaslModuleOptions) {
    this.#roles = options.roles;
  }

  public createForUser<User extends AuthedUser = AuthedUser>(
    user: User,
  ): AnyAbility {
    const template = this.#roles[user.role];

    if (!template) {
      throw new Error('Roles permissions were not set.');
    }

    const permissions = interpolate(template, { user });
    return createMongoAbility(permissions);
  }
}
