import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const options: NestApplicationOptions = { rawBody: true };
  const app = await NestFactory.create(AppModule, options);

  const config = new DocumentBuilder()
    .setTitle('Teachflow API')
    .setDescription('Teachflow is an open-source learning management system.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.APP_PORT!);
}

void bootstrap();
