import { Type } from '@mikro-orm/core';
import { Password } from 'src/modules/users/domain/value-objects/password';

export class PasswordType extends Type<Password, string> {
  public convertToDatabaseValue(value: Password): string {
    return value.value;
  }

  public convertToJSValue(value: string): Password {
    return Password.create(value);
  }
}
