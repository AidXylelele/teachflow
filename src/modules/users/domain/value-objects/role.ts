import { ValueObject } from 'src/core/domain/value-object';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class Role extends ValueObject<UserRole> {
  private constructor(value: UserRole) {
    super(value);
  }

  public static create(value: UserRole): Role {
    if (!Object.values(UserRole).includes(value)) {
      throw new Error('Invalid user role');
    }

    return new Role(value);
  }
}
