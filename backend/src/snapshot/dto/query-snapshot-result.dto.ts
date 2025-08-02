import { QuerySnapshotResult } from '../interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

/**
 * 建立動態快照回應 DTO
 * 對應建立快照後回傳的結果
 */
export class QuerySnapshotResultDto implements QuerySnapshotResult {
  /**
   * 快照唯一識別碼
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '快照唯一識別碼',
    example: 'query_1753782323871_766ab85a',
  })
  id!: string;
  /**
   * 回應訊息
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '回應訊息',
    example: '建立成功',
  })
  message!: string;
  /**
   * 建立時間戳記
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: '建立時間戳記',
    example: 1753782323871,
  })
  timestamp!: number;
  /**
   * 快照模式 (dynamic: 動態快照, static: 靜態快照)
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '快照模式 (dynamic: 動態快照, static: 靜態快照)',
    example: 'dynamic',
  })
  snapshotMode!: 'dynamic' | 'static';
}
