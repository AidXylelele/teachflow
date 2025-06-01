import { ValueObject } from 'src/core/domain/value-object';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  MENTOR = 'mentor',
  PUBLISHER = 'publisher',
}

export class Role extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Role {
    if (!Object.values(UserRole).includes(value as UserRole)) {
      throw new Error('Invalid user role');
    }

    return new Role(value);
  }
}
