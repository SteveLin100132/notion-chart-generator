import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * 初始化並配置 NestJS 應用程式。
 *
 * - 啟用指定來源和 HTTP 方法的 CORS。
 * - 套用全域驗證管道，啟用轉換與白名單。
 * - 設定全域 API 前綴。
 * - 於 3001 埠啟動伺服器並輸出啟動訊息。
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 啟用 CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 全局驗證管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // API 前綴
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log(
    '🚀 Notion Chart Backend Server running on http://localhost:3001',
  );
}

bootstrap();
