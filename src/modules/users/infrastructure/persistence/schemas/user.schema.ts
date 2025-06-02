import { EntitySchema } from '@mikro-orm/core';

export interface UserModel {
  id: string;
  email: string;
  name: string;
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const UserSchema = new EntitySchema<UserModel>({
  name: 'User',
  tableName: 'users',

  properties: {
    id: {
      type: 'uuid',
      primary: true,
    },
    email: {
      type: 'varchar',
      unique: true,
      length: 255,
      name: 'email',
    },
    name: {
      type: 'varchar',
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
