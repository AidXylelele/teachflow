import { isEnum } from 'class-validator';
import { InvalidArgumentException } from 'src/common/domain/exceptions/invalid-argument.exception';
import { ValueObject } from 'src/common/domain/value-object/value-object';

import { GENDER } from '../enums/gender';

export class Gender extends ValueObject<GENDER> {
  public get isMale(): boolean {
    return this.value === GENDER.MALE;
  }

  public get isFemale(): boolean {
    return this.value === GENDER.FEMALE;
  }

  public get isNonBinary(): boolean {
    return this.value === GENDER.NON_BINARY;
  }

  public get isUnknown(): boolean {
    return this.value === GENDER.UNKNOWN;
  }

  protected validate(value: GENDER): void {
    if (!isEnum(value, GENDER)) {
      throw new InvalidArgumentException(
        `Invalid gender: '${value}'. Allowed values: ${Object.values(GENDER).join(', ')}`,
      );
    }
  }
}
