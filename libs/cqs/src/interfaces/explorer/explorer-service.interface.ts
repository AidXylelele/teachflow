import { ProvidersIntrospectionResult } from './providers-introspection-result.interface';

export interface IExplorerService {
  explore(): ProvidersIntrospectionResult;
}
