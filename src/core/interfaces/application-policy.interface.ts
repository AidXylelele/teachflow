export interface ApplicationPolicy<T> {
  create(entity: T): boolean;
  read(entity: T): boolean;
  update(entity: T): boolean;
  delete(entity: T): boolean;
}
