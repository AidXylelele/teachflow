import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { ClsService } from '../interfaces/cls-service.interface';

@Injectable()
export class AsyncLocalStorageService implements ClsService {
  readonly #als = new AsyncLocalStorage<Map<string | Symbol, unknown>>();

  public run(
    callback: () => void,
    initialStore?: Map<string | Symbol, unknown>,
  ): void {
    const store = initialStore || new Map<string | Symbol, unknown>();
    this.#als.run(store, callback);
  }

  public get<T>(key: string | Symbol): T | undefined {
    const store = this.#als.getStore();
    return store ? (store.get(key) as T) : undefined;
  }

  public set<T>(key: string | Symbol, value: T): void {
    const store = this.#als.getStore();

    if (store) store.set(key, value);
  }

  public getStore(): Map<string | Symbol, unknown> | undefined {
    return this.#als.getStore();
  }
}
