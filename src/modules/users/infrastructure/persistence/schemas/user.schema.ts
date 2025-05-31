import { EntitySchema } from '@mikro-orm/core';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export const userSchema = new EntitySchema<UserSchemaAttributes, User>();
