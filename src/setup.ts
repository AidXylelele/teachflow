import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { LoggingService } from './common/application/logging-service/logging-service';
import { BASE_TOKEN } from './common/di-tokens';
import { ApiConfigService } from './common/infrastructure/config/services/api.config-service';
import { AppConfigService } from './common/infrastructure/config/services/app.config-service';
import { TypeormExceptionFilter } from './common/interfaces/http/filters/typeorm-exception-filter';
import { HttpRequestLoggingInterceptor } from './common/interfaces/http/interceptors/http-logging.interceptor';
import { HttpRequestTraceIdInterceptor } from './common/interfaces/http/interceptors/http-trace-id.interceptor';
import { UserIdentityInterceptor } from './common/interfaces/http/interceptors/user-identity.interceptor';
import { SqsExceptionFilter } from './common/interfaces/sqs/filters/sqs.exception-filter';
import { SqsRequestLoggingInterceptor } from './common/interfaces/sqs/interceptors/sqs-logging.interceptor';
import { SqsRequestTraceIdInterceptor } from './common/interfaces/sqs/interceptors/sqs-trace-id.interceptor';

export class ApplicationSetup {
  private readonly app: NestExpressApplication;
  private readonly appConfigService: AppConfigService;
  private readonly apiConfigService: ApiConfigService;

  constructor(app: NestExpressApplication) {
    this.app = app;
    this.apiConfigService = app.get(ApiConfigService);
    this.appConfigService = app.get(AppConfigService);
  }

  public enable(): void {
    this.disableXPoweredBy();
    this.enableCors();
    this.enableVersioning();
    this.setupSwagger();
    this.setLogLevels();
    this.setGlobalPipes();
    this.setGlobalFilters();
    this.setGlobalInterceptors();
    this.setupGracefulShutdown();
  }

  private setupSwagger(): void {
    const config = new DocumentBuilder()
      .setTitle(this.apiConfigService.docsTitle)
      .setVersion(this.apiConfigService.docsVersion)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(
      this.apiConfigService.docsRoute,
      this.app,
      document,
      this.apiConfigService.options,
    );
  }

  private setGlobalPipes(): void {
    this.app.useGlobalPipes(
      new ValidationPipe(this.appConfigService.validationPipeOptions),
    );
  }

  private setGlobalFilters(): void {
    const typeormExceptionFilter = this.app.get(TypeormExceptionFilter);
    const sqsExceptionFilter = this.app.get(SqsExceptionFilter);

    this.app.useGlobalFilters(typeormExceptionFilter);
    this.app.useGlobalFilters(sqsExceptionFilter);
  }

  private setGlobalInterceptors(): void {
    const httpRequestTraceIdInterceptor = this.app.get(
      HttpRequestTraceIdInterceptor,
    );
    const httpRequestLoggingInterceptor = this.app.get(
      HttpRequestLoggingInterceptor,
    );
    const sqsRequestTraceIdInterceptor = this.app.get(
      SqsRequestTraceIdInterceptor,
    );
    const sqsRequestLoggingInterceptor = this.app.get(
      SqsRequestLoggingInterceptor,
    );

    this.app.useGlobalInterceptors(httpRequestTraceIdInterceptor);
    this.app.useGlobalInterceptors(httpRequestLoggingInterceptor);
    this.app.useGlobalInterceptors(sqsRequestTraceIdInterceptor);
    this.app.useGlobalInterceptors(sqsRequestLoggingInterceptor);

    const userIdentityInterceptor = this.app.get(UserIdentityInterceptor);
    this.app.useGlobalInterceptors(userIdentityInterceptor);
  }

  private setLogLevels(): void {
    const logger: LoggingService = this.app.get(BASE_TOKEN.LOGGER_SERVICE);
    this.app.useLogger(logger);
  }

  private enableCors(): void {
    this.app.enableCors(this.appConfigService.corsOptions);
  }

  private enableVersioning(): void {
    this.app.enableVersioning({ type: VersioningType.URI });
  }

  private disableXPoweredBy(): void {
    this.app.disable('x-powered-by');
  }

  private setupGracefulShutdown(): void {
    this.app.enableShutdownHooks();
  }
}
