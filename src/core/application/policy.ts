export interface Policy<T> {
  create(entity: T): boolean;
  read(entity: T): boolean;
  update<>(entity: T, input): boolean;
  delete(entity: T): boolean;
}
