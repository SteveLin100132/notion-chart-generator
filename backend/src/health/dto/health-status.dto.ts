import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { HealthStatus } from '../interface';

export class HealthStatusDto implements HealthStatus {
  /**
   * 健康狀態
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '健康狀態',
    example: 'ok',
  })
  status: string;
  /**
   * 伺服器時間戳
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '伺服器時間戳',
    example: '2025-08-02T12:00:00.000Z',
  })
  timestamp: string;
  /**
   * 服務名稱
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '服務名稱',
    example: 'notion-chart-generator-backend',
  })
  service: string;
}
