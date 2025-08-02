import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QueryDatabase } from '../interface';

/**
 * 資料庫查詢資料傳輸物件
 * 用於查詢 Notion 資料庫內容，支援篩選條件和分頁功能
 */
export class QueryDatabaseDto implements QueryDatabase {
  /**
   * Notion API Token，必須具有對指定資料庫的讀取權限
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Notion API Token，必須具有對指定資料庫的讀取權限',
    example: 'secret_xxx',
  })
  token: string;
  /**
   * Notion 資料庫的唯一識別碼，格式為 UUID
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description:
      'Notion 資料庫的唯一識別碼，格式為 UUID (例: 12345678-1234-1234-1234-123456789abc)',
    example: '12345678-1234-1234-1234-123456789abc',
  })
  databaseId: string;
  /**
   * 查詢篩選條件 (可選)
   * 符合 Notion API 篩選格式的物件
   * 例: { "property": "Status", "status": { "equals": "Done" } }
   */
  @IsOptional()
  @IsObject()
  @ApiProperty({
    type: Object,
    required: false,
    description: '查詢篩選條件 (可選)，符合 Notion API 篩選格式的物件',
    example: { property: 'Status', status: { equals: 'Done' } },
    default: undefined,
  })
  filter?: any;
  /**
   * 每頁回傳的資料筆數 (可選)
   * 最小值為 1，最大值為 100 (Notion API 限制)
   * 預設值為 100
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    required: false,
    description:
      '每頁回傳的資料筆數 (可選)，最小值為 1，最大值為 100 (Notion API 限制)',
    example: 100,
    default: 100,
  })
  pageSize?: number;
  /**
   * 分頁游標起始位置 (可選)
   * 用於取得下一頁資料，值來自前一次查詢的 next_cursor
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description:
      '分頁游標起始位置 (可選)，用於取得下一頁資料，值來自前一次查詢的 next_cursor',
    example: 'abcdefg123456',
    default: undefined,
  })
  startCursor?: string;
}
