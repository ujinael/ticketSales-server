import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = +process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });

  app.enableCors({
    methods: ['PUT', 'POST', 'PATCH', 'DELETE', 'GET'],
    origin: 'http://localhost:4200',
    // allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true,
  });
  await app.listen(PORT, () => {
    Logger.log(`SERVER START ON PORT:${PORT}`);
  });
}

bootstrap();
