import {
  DynamicModule,
  ForwardReference,
  InjectionToken,
  OptionalFactoryDependency,
  Type,
} from '@nestjs/common';
import { SpanExporter, SpanProcessor } from '@opentelemetry/sdk-trace-node';

export interface OtelModuleOptions {
  serviceName: string;

  otlpEndpoint?: string;

  traceExporter?: SpanExporter;

  metricReader?: MetricReader;

  spanProcessor?: SpanProcessor;

  instrumentations?: InstrumentationOption[];

  resourceAttributes?: Record<string, unknown>;

  sdkConfiguration?: Partial<
    Omit<
      NodeSDKConfiguration,
      | 'resource'
      | 'serviceName'
      | 'traceExporter'
      | 'metricReader'
      | 'spanProcessor'
      | 'instrumentations'
    >
  >;
}

export interface OtelModuleAsyncOptions {
  imports?:
    | (
        | Type<unknown>
        | DynamicModule
        | ForwardReference<unknown>
        | Promise<DynamicModule>
      )[]
    | undefined;
  useFactory: (
    ...args: unknown[]
  ) => Promise<OtelModuleOptions> | OtelModuleOptions;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
}
