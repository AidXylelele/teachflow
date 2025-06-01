import { Type } from '@mikro-orm/core';
import { Role, UserRole } from 'src/modules/users/domain/value-objects/role';

export class RoleType extends Type<Role, UserRole> {
  public convertToDatabaseValue(value: Role): UserRole {
    return value.value;
  }

  public convertToJSValue(value: UserRole): Role {
    return Role.create(value);
  }
}
