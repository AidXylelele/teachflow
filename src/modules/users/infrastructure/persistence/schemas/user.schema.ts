import { EntitySchema } from '@mikro-orm/core';
import { Uuid } from 'src/core/domain/uuid';
import { Email } from 'src/modules/users/domain/value-objects/email';
import { Name } from 'src/modules/users/domain/value-objects/name';
import { EmailType } from '../types/email.type';
import { NameType } from '../types/name.type';

export interface IUserSchema {
  id: Uuid;
  email: Email;
  name: Name;
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const UserSchema = new EntitySchema<IUserSchema>({
  name: 'User',
  tableName: 'users',

  properties: {
    id: {
      type: 'uuid',
      primary: true,
    },
    email: {
      type: EmailType,
      unique: true,
      length: 255,
      columnType: 'varchar(255)',
      name: 'email',
    },
    name: {
      type: NameType,
      length: 255,
      columnType: 'varchar(255)',
      name: 'name',
    },
    version: {
      type: 'number',
      version: true,
      default: 0,
      name: 'version',
    },
    createdAt: {
      type: 'Date',
      onCreate: (): Date => new Date(),
      defaultRaw: 'CURRENT_TIMESTAMP',
      name: 'created_at',
      columnType: 'timestamp with time zone',
    },
    updatedAt: {
      type: 'Date',
      onCreate: (): Date => new Date(),
      onUpdate: (): Date => new Date(),
      defaultRaw: 'CURRENT_TIMESTAMP',
      name: 'updated_at',
      columnType: 'timestamp with time zone',
    },
    deletedAt: {
      type: 'Date',
      nullable: true,
      name: 'deleted_at',
      columnType: 'timestamp with time zone',
      default: null,
    },
  },

  indexes: [{ properties: 'email', name: 'idx_users_email_unique' }],

  filters: {
    softDelete: {
      cond: { deletedAt: null },
      default: true,
      name: 'soft_delete',
    },
  },
});
