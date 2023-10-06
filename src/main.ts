import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './util/interceptors/transform.interceptor';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 2000;

  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Book Project')
    .setDescription("book API's")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app
    .listen(port)
    .then(() => logger.log(`Titan-be started successfully on ${port}`));
}
bootstrap();
