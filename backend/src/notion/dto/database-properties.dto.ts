import { IsString, IsNotEmpty, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DatabaseProperties } from '../interface';

/**
 * 資料庫屬性查詢資料傳輸物件
 * 用於取得特定 Notion 資料庫的屬性結構和詳細資訊
 */
export class DatabasePropertiesDto implements DatabaseProperties {
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
}
