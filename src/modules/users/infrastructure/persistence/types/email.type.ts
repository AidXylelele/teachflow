import { Type } from '@mikro-orm/core';
import { Email } from 'src/modules/users/domain/value-objects/email';

export class EmailType extends Type<Email, string> {
  public convertToDatabaseValue(value: Email): string {
    return value.value;
  }

  public convertToJSValue(value: string): Email {
    return Email.create(value);
  }
}
