import {
  DynamicModule,
  Global,
  Inject,
  Logger,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  Provider,
} from '@nestjs/common';
import { OTEL_MODULE_OPTIONS, OTEL_SDK } from './otel.di-tokens';
import {
  OtelModuleAsyncOptions,
  OtelModuleOptions,
} from './interfaces/otel-module-options.interface';

@Global()
@Module({})
export class OtelModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OtelModule.name);

  public constructor(@Inject(OTEL_SDK) private readonly sdk: NodeSDK) {}

  public static forRoot(options: OtelModuleOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: OTEL_MODULE_OPTIONS,
      useValue: options,
    };

    const sdkProvider = this.createSdkProvider();

    return {
      module: OtelModule,
      providers: [optionsProvider, sdkProvider],
      exports: [sdkProvider],
    };
  }

  public static forRootAsync(options: OtelModuleAsyncOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: OTEL_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const sdkProvider = this.createSdkProvider();

    return {
      module: OtelModule,
      imports: options.imports,
      providers: [optionsProvider, sdkProvider],
      exports: [sdkProvider],
    };
  }

  private static createSdkProvider(): Provider {
    return {
      provide: OPENTELEMETRY_SDK,
      useFactory: (configOptions: OpenTelemetryModuleOptions): NodeSDK => {
        const logger = new Logger('OpenTelemetrySdkFactory'); // Логгер для фабрики
        logger.log(
          `Initializing OpenTelemetry SDK for service: ${configOptions.serviceName}`,
        );

        const otlpEndpoint =
          configOptions.otlpEndpoint || DEFAULT_OTLP_ENDPOINT;

        const resource = new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: configOptions.serviceName,
          ...configOptions.resourceAttributes,
        });

        // Default Trace Exporter (Strategy Pattern)
        const traceExporter =
          configOptions.traceExporter ||
          new OTLPTraceExporter({ url: `${otlpEndpoint}/v1/traces` });

        // Default Span Processor (Strategy Pattern)
        // BatchSpanProcessor рекомендуется для продакшена.
        const spanProcessor =
          configOptions.spanProcessor || new BatchSpanProcessor(traceExporter);

        // Default Metric Reader (Strategy Pattern)
        const metricReader =
          configOptions.metricReader ||
          new PeriodicExportingMetricReader({
            exporter: new OTLPMetricExporter({
              url: `${otlpEndpoint}/v1/metrics`,
            }),
            exportIntervalMillis: 10000, // TODO: Сделать настраиваемым
          });

        // Core instrumentations that are almost always useful for a NestJS application.
        // Users can provide more via options.instrumentations.
        // Принцип OCP (SOLID) - базовые инструменторы включены, пользователь может добавить свои.
        const coreInstrumentations: InstrumentationOption[] = [
          new HttpInstrumentation(), // Covers outgoing HTTP requests and incoming if Express/Nest not specific enough
          new ExpressInstrumentation(), // Specific to Express framework
          new NestInstrumentation(), // Specific to NestJS framework for richer controller/handler spans
        ];

        const allInstrumentations = [
          ...coreInstrumentations,
          ...(configOptions.instrumentations || []),
        ];

        logger.log(
          `Registered Instrumentations: ${allInstrumentations.map((instr) => instr.instrumentationName).join(', ')}`,
        );

        const sdk = new NodeSDK({
          resource,
          traceExporter,
          spanProcessor,
          metricReader,
          instrumentations: allInstrumentations,
          ...(configOptions.sdkConfiguration || {}),
        });

        return sdk;
      },
      inject: [OPENTELEMETRY_MODULE_OPTIONS],
    };
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.sdk.start();
      this.logger.log('OpenTelemetry SDK started successfully.');
    } catch (error) {
      this.logger.error('Failed to start OpenTelemetry SDK:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.sdk.shutdown();
      this.logger.log('OpenTelemetry SDK shut down successfully.');
    } catch (error) {
      this.logger.error('Failed to shut down OpenTelemetry SDK:', error);
    }
  }
}
