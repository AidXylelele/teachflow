import { Type } from '@mikro-orm/core';
import { Name } from 'src/modules/users/domain/value-objects/name';

export class NameType extends Type<Name, string> {
  public convertToDatabaseValue(value: Name): string {
    return value.value;
  }

  public convertToJSValue(value: string): Name {
    return Name.create(value);
  }
}
