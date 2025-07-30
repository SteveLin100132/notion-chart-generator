import { Controller, Get } from '@nestjs/common';

/**
 * 健康檢查控制器
 *
 * 提供應用程式健康狀態檢查端點
 */
@Controller('health')
export class HealthController {
  /**
   * 健康檢查端點
   *
   * @returns 健康狀態訊息
   */
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'notion-chart-generator-backend',
    };
  }
}
