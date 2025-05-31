import {
  isArray,
  isBoolean,
  isIn,
  isNotEmpty,
  isNotEmptyObject,
} from 'class-validator';
import { ValueObject } from 'src/core/classes/value-object';
import { ValidationFailedException } from 'src/core/exceptions/validation-failed.exception';

export interface PermissionProps {
  action: string[];
  subject: string[];
  fields?: string[];
  conditions?: Record<string, unknown>;
  inverted: boolean;
}

export class Permission extends ValueObject<PermissionProps> {
  private constructor(value: PermissionProps) {
    super(value);
  }

  public static create(props: PermissionProps): Permission {
    const actions = ['read', 'create', 'update', 'delete', 'manage'];
    const subjects = ['all'];

    if (!isIn(props.action, actions)) {
      throw new ValidationFailedException(
        'Invalid "action". Must be a non-empty array of actions.',
      );
    }

    if (!isIn(props.subject, subjects)) {
      throw new ValidationFailedException(
        'Invalid "subject". Must be a non-empty array of Subject enums.',
      );
    }

    if (
      isNotEmpty(props.fields) &&
      (!isArray(props.fields) || !props.fields.every(isNotEmpty))
    ) {
      throw new ValidationFailedException(
        'Invalid "fields". If provided, must be an array of non-empty strings.',
      );
    }

    if (isNotEmpty(props.conditions) && !isNotEmptyObject(props.conditions)) {
      throw new ValidationFailedException(
        'Invalid "conditions". If provided, must be an object.',
      );
    }

    if (!isBoolean(props.inverted)) {
      throw new ValidationFailedException(
        'Invalid "inverted". Must be a boolean.',
      );
    }

    return new Permission(props);
  }
}
