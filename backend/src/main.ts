import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AllExceptionsFilter,
  prometheusRegistry,
  ResponseInterceptor,
} from './common';
import { Log4jsLoggerService } from './logger';

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

  // 啟用 CORS - 允許所有來源
  app.enableCors({
    origin: true, // 允許所有來源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 允許攜帶認證信息
  });

  // 設定全域中介軟體，使用 log4js 記錄 API 請求與回應
  app.useLogger(new Log4jsLoggerService());

  // 全局驗證管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // 設定 Swagger 文件
  const apiDocDescription =
    'The API description<br><a href="/swagger-json" target="_blank">OpenAPI Spec JSON</a>';
  const config = new DocumentBuilder()
    .setTitle('Steve APP example')
    .setDescription(apiDocDescription)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // 提供 /swagger-json 路徑給 Swagger UI 讀取 OpenAPI spec
  app.use('/swagger-json', (req, res) => res.json(document));

  // 設定 Swagger UI 在根目錄，並指定 spec 路徑
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      url: '/swagger-json',
    },
  });

  // 設定全域攔截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 設定全域異常過濾器
  app.useGlobalFilters(new AllExceptionsFilter());

  // 提供 /metrics endpoint 讓 Prometheus 抓取 metrics
  app.use('/metrics', async (req, res) => {
    res.setHeader('Content-Type', prometheusRegistry.contentType);
    res.end(await prometheusRegistry.metrics());
  });

  // API 前綴
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log(
    '🚀 Notion Chart Backend Server running on http://localhost:3001',
  );
}

bootstrap();
