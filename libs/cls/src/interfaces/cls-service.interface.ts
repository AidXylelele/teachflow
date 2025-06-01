export interface ClsService {
  run(callback: () => void, initialStore?: Map<string | Symbol, unknown>): void;
  get<T>(key: string | Symbol): T | undefined;
  set<T>(key: string | Symbol, value: T): void;
  getStore(): Map<string | Symbol, unknown> | undefined;
}
