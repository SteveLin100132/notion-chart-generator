import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { HealthStatusDto } from './dto';

/**
 * 健康檢查控制器
 *
 * 提供應用程式健康狀態檢查端點
 */
@ApiTags('health')
@Controller('health')
export class HealthController {
  /**
   * 健康檢查端點
   *
   * @returns 健康狀態訊息
   */
  @Get()
  @ApiOkResponse({ description: '健康檢查結果', type: HealthStatusDto })
  check(): HealthStatusDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'notion-chart-generator-backend',
    };
  }
}
