import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { GetDatabaseProperties } from '../interface';

/**
 * 取得資料庫屬性結構回應 DTO
 * 包含資料庫 ID、標題與屬性清單
 */
export class GetDatabasePropertiesDto implements GetDatabaseProperties {
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
   * 資料庫屬性清單
   */
  @IsArray()
  @ApiProperty({
    type: [Object],
    required: true,
    description: '資料庫屬性清單',
    example: [
      {
        name: 'Status',
        type: 'select',
        id: 'status',
        options: [{ name: 'Done', id: '1', color: 'green' }],
      },
      { name: 'Name', type: 'title', id: 'name' },
    ],
  })
  properties: any[];
}
