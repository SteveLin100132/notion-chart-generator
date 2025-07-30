import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * 健康檢查模組
 *
 * 提供應用程式健康狀態檢查功能
 */
@Module({
  controllers: [HealthController],
})
export class HealthModule {}
