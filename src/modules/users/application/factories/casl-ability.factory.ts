import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { UserRole } from '../../domain/value-objects/role';
import { Subject as AppSubjectEnum } from 'src/common/enums/subject.enum';

// Define action enum if you don't have one
export enum Action {
  Manage = 'manage', // wildcard for any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// Define your subjects. User is a class, others can be strings or enums.
// The key is that CaslAbilityFactory.createForUser uses these same references.
export type AppSubjects =
  | typeof User
  | 'Post'
  | 'Comment'
  | AppSubjectEnum.ALL
  | 'all';

export type AppAbility = Ability<[Action, AppSubjects]>;

@Injectable()
export class CaslAbilityFactory {
  public createForUser(user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    // User.role is now a Role VO. Access its enum value via user.role.value
    // (Assuming ValueObject base class provides public readonly value: T)
    const userRoleEnumValue = user.role.value;

    switch (userRoleEnumValue) {
      case UserRole.ADMIN:
        can(Action.Manage, AppSubjectEnum.ALL); // Use the enum member
        // Or be more specific:
        // can(Action.Manage, User);
        // can(Action.Manage, 'Post');
        // can(Action.Read, 'Comment');
        break;
      case UserRole.USER:
        can(Action.Read, AppSubjectEnum.ALL); // Use the enum member
        can(Action.Create, 'Post'); // User can create posts
        can(Action.Update, 'Post', { authorId: user.id.value }); // User can update their own posts
        can(Action.Delete, 'Post', { authorId: user.id.value }); // User can delete their own posts
        // Add more specific permissions for USER role
        break;
      // Add cases for other roles
      default:
        // Basic permissions for any authenticated user or guest if not handled by roles
        can(Action.Read, 'Post');
        break;
    }

    return build({
      // The official CASL documentation recommends this approach for detectSubjectType
      // when dealing with a mix of classes and literal types.
      detectSubjectType: (type) => type as ExtractSubjectType<AppSubjects>,
    });
  }
}
