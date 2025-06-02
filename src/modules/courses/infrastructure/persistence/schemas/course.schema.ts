import { EntitySchema } from '@mikro-orm/core';

export interface CourseModel {
  id: string;
  title: string;
  version: number;
  tags: string[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const CourseSchema = new EntitySchema<CourseModel>({
  name: 'Course',
  tableName: 'courses',
  properties: {
    id: {
      type: 'uuid',
      primary: true,
      name: 'id',
    },
    title: {
      type: 'varchar',
      length: 255,
      name: 'name',
    },
    tags: {
      type: 'text[]',
      nullable: true,
      default: '{}',
      name: 'tags',
    },
    isPublished: {
      type: 'boolean',
      default: false,
      name: 'is_published',
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
      columnType: 'timestamp with time zone',
      name: 'created_at',
    },
    updatedAt: {
      type: 'Date',
      onCreate: (): Date => new Date(),
      onUpdate: (): Date => new Date(),
      defaultRaw: 'CURRENT_TIMESTAMP',
      columnType: 'timestamp with time zone',
      name: 'updated_at',
    },
    deletedAt: {
      type: 'Date',
      nullable: true,
      default: null,
      columnType: 'timestamp with time zone',
      name: 'deleted_at',
    },
  },

  indexes: [
    { properties: 'title', name: 'idx_courses_title' },
    { properties: 'isPublished', name: 'idx_courses_is_published' },
    {
      name: 'idx_courses_tags_gin',
      properties: ['tags'],
      type: 'GIN',
    },
  ],
  filters: {
    softDelete: {
      cond: { deletedAt: null },
      default: true,
      name: 'soft_delete',
    },
  },
});
