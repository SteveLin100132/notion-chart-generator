import { Snapshot } from '../interface';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  isObject,
  IsObject,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 圖表快照 DTO
 * 對應儲存於檔案系統的圖表快照資料
 */
export class SnapshotDto implements Snapshot {
  /** 快照唯一識別碼 */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '快照唯一識別碼',
    example: 'query_1753782323871_766ab85a',
  })
  id!: string;
  /**
   * 圖表資料陣列
   */
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: '圖表資料陣列',
    example: [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
    ],
  })
  data!: any[];
  /**
   * 圖表類型 (如: bar, line, pie 等)
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '圖表類型 (如: bar, line, pie 等)',
    example: 'bar',
  })
  chartType!: string;
  /**
   * 聚合函數類型 (如: sum, avg, count 等)
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '聚合函數類型 (如: sum, avg, count 等)',
    example: 'sum',
  })
  aggregateFunction!: string;
  /**
   * 圖表標題
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '圖表標題',
    example: '動態銷售統計圖',
  })
  title!: string;
  /**
   * 是否為示範資料
   */
  @IsBoolean()
  @ApiProperty({
    description: '是否為示範資料',
    example: false,
    default: false,
  })
  isDemo!: boolean;
  /**
   * 建立時間戳記
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '建立時間戳記',
    example: 1753782323871,
  })
  timestamp!: number;
  /**
   * 建立日期 (ISO 字串格式)
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '建立日期 (ISO 字串格式)',
    example: '2025-08-02T12:00:00.000Z',
  })
  createdAt!: string;
  /**
   * 原始資料庫資料（用於資料表格顯示）
   */
  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({
    description: '原始資料庫資料（用於資料表格顯示）',
    example: [{ id: 1, name: 'A' }],
    default: undefined,
  })
  rawData?: any[];
}
