import { RESULT_KEY } from '../consts/result-key';

export abstract class Command<T = unknown> {
  public readonly [RESULT_KEY]: T;
}
