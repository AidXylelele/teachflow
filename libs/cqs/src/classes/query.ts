import { RESULT_KEY } from '../consts/result-key';

export abstract class Query<T = unknown> {
  public readonly [RESULT_KEY]: T;
}
