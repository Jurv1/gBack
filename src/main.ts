import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { myExceptionFactory } from './exceptions/exception.factory';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: myExceptionFactory,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Gas')
    .setDescription('GAS API description')
    .setVersion('1.0')
    .addTag('GAS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'openapi.json',
  });
  app.setGlobalPrefix('/');
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(8080);
}
bootstrap();
