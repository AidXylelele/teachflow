export interface Extractor<T> {
  getOrFail(): T;
}
