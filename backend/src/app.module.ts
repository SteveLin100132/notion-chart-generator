import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotionModule } from './notion';
import { SnapshotModule } from './snapshot';
import { HealthModule } from './health';
import { LoggingMiddleware } from './common';

/**
 * 應用程式的根模組。
 *
 * @remarks
 * 此模組匯入並設定全域的 `ConfigModule`，以及 `NotionModule`、`SnapshotModule` 和 `HealthModule`。
 * `ConfigModule` 設為全域，使設定值可在整個應用程式中存取。
 *
 * @module AppModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotionModule,
    SnapshotModule,
    HealthModule,
  ],
})
export class AppModule {
  /**
   * 設定中介軟體，將 LoggingMiddleware 應用於所有路由。
   *
   * @param {MiddlewareConsumer} consumer - NestJS 的 MiddlewareConsumer，用於配置中介軟體。
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
