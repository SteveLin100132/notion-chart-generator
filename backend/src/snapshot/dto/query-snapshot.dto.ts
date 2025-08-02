import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuerySnapshot } from '../interface';

/**
 * 動態快照查詢參數 DTO
 * 對應儲存於檔案系統的查詢快照設定
 */
export class QuerySnapshotDto implements QuerySnapshot {
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
   * Notion 資料庫 ID
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Notion 資料庫 ID',
    example: 'abc1234567890',
  })
  databaseId!: string;
  /**
   * 加密的 Notion API Token
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '加密的 Notion API Token',
    example: 'encrypted_xxx',
  })
  encryptedToken!: string;
  /**
   * X 軸屬性 ID
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'X 軸屬性 ID',
    example: 'name',
  })
  xProperty!: string;
  /**
   * Y 軸屬性 ID
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Y 軸屬性 ID',
    example: 'value',
  })
  yProperty!: string;
  /**
   * 圖表類型 (如: bar, line, pie 等)
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
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
    type: String,
    required: true,
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
    type: String,
    required: true,
    description: '圖表標題',
    example: '動態銷售統計圖',
  })
  title!: string;
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
  /**
   * 是否為示範資料
   */
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: true,
    description: '是否為示範資料',
    example: false,
    default: false,
  })
  isDemo!: boolean;
  /**
   * 建立時間戳記
   */
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
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
    type: String,
    required: true,
    description: '建立日期 (ISO 字串格式)',
    example: '2025-08-02T12:00:00.000Z',
  })
  createdAt!: string;
  /**
   * 最後更新時間 (ISO 字串格式)
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: '最後更新時間 (ISO 字串格式)',
    example: '2025-08-02T12:00:00.000Z',
    default: undefined,
  })
  lastUpdated?: string;
  /**
   * 篩選條件 (可選)
   */
  @IsOptional()
  @IsObject()
  @ApiProperty({
    type: Object,
    required: false,
    description: '篩選條件 (可選)',
    example: { and: [{ property: 'status', equals: 'active' }] },
    default: undefined,
  })
  filters?: any;
}
