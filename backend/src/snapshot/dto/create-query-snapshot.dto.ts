import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuerySnapshot } from '../interface';

/**
 * 查詢參數快照資料傳輸物件
 *
 * 用於建立基於查詢參數的動態快照
 * 儲存查詢條件而非靜態資料，確保資料即時性
 */
export class CreateQuerySnapshotDto implements CreateQuerySnapshot {
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
  databaseId: string;
  /**
   * Notion API Token (加密儲存)
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Notion API Token (加密儲存)',
    example: 'secret_xxx',
  })
  notionToken: string;
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
  xProperty: string;
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
  yProperty: string;
  /**
   * 圖表類型
   * 如: bar(長條圖), line(折線圖), pie(圓餅圖), radar(雷達圖) 等
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description:
      '圖表類型，如: bar(長條圖), line(折線圖), pie(圓餅圖), radar(雷達圖) 等',
    example: 'bar',
  })
  chartType: string;
  /**
   * 聚合函數
   * 資料聚合的方式，如: sum(總和), avg(平均), count(計數) 等
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description:
      '聚合函數，資料聚合的方式，如: sum(總和), avg(平均), count(計數) 等',
    example: 'sum',
  })
  aggregateFunction: string;
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
  title: string;
  /**
   * 快照模式
   * dynamic: 動態快照 (即時查詢)
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: '快照模式，dynamic: 動態快照 (即時查詢)',
    example: 'dynamic',
    default: undefined,
  })
  snapshotMode?: 'dynamic';
  /**
   * 是否為示範資料 (可選)
   * 用於標記測試或範例資料，預設為 false
   */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: false,
    description: '是否為示範資料 (可選)，用於標記測試或範例資料',
    example: false,
    default: false,
  })
  isDemo?: boolean;
  /**
   * 篩選條件 (可選)
   * 用於過濾資料庫查詢結果的條件
   */
  @IsOptional()
  @IsObject()
  @ApiProperty({
    type: Object,
    required: false,
    description: '篩選條件 (可選)，用於過濾資料庫查詢結果的條件',
    example: { and: [{ property: 'status', equals: 'active' }] },
    default: undefined,
  })
  filters?: any;
}
