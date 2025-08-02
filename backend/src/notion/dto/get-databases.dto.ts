import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { GetDatabases } from '../interface';

/**
 * 取得資料庫清單回應 DTO
 * 包含 ID、標題、屬性與最後編輯時間
 */
export class GetDatabasesDto implements GetDatabases {
  /**
   * 資料庫 ID
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '資料庫 ID',
    example: '12345678-1234-1234-1234-123456789abc',
  })
  id: string;
  /**
   * 資料庫標題
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '資料庫標題',
    example: 'My Database',
  })
  title: string;
  /**
   * 資料庫屬性名稱陣列
   */
  @IsArray()
  @ApiProperty({
    type: [String],
    required: true,
    description: '資料庫屬性名稱陣列',
    example: ['Name', 'Status', 'Date'],
  })
  properties: string[];
  /**
   * 最後編輯時間
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '最後編輯時間',
    example: '2025-08-02T12:00:00.000Z',
  })
  last_edited_time: string;
}
