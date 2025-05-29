import { InvalidArgumentException } from 'src/common/domain/exceptions/invalid-argument.exception';
import { ValueObject } from 'src/common/domain/value-object/value-object';

export class DateOfBirth extends ValueObject<string> {
  protected validate(value: string): void {
    const inputDate = new Date(value);

    if (isNaN(inputDate.getTime())) {
      throw new InvalidArgumentException('Invalid birth date: wrong format');
    }

    const AGE_RESTRICTION = 13;
    const today = new Date();
    const minimumAllowedDate = new Date(
      today.getFullYear() - AGE_RESTRICTION,
      today.getMonth(),
      today.getDate(),
    );

    if (inputDate > minimumAllowedDate) {
      throw new InvalidArgumentException(
        `Invalid birth date: ${inputDate.toISOString()}. User can not be younger than ${AGE_RESTRICTION} years old.`,
      );
    }
  }
}
