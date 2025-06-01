export const Actions = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage',
} as const;

export const Subjects = {
  USER: 'User',
  COURSE: 'Course',
  LESSON: 'Lesson',
} as const;

export const AUTH_CONTEXT_KEY = Symbol('AUTH_CONTEXT_KEY');
