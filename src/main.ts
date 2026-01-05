import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = Number(configService.get('PORT')) || 8080;

  app.setGlobalPrefix('api/v1', { exclude: ['/health', '/'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });

  // ⭐ QUAN TRỌNG NHẤT
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on 0.0.0.0:${port}`);
}
bootstrap();
