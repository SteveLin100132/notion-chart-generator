import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { QueryDatabaseResult } from '../interface';

/**
 * 查詢資料庫內容回應 DTO
 * 包含查詢結果、是否有更多資料、下一頁游標
 */
export class QueryDatabaseResultDto implements QueryDatabaseResult {
  /**
   * 查詢結果資料陣列
   */
  @IsArray()
  @ApiProperty({
    type: [Object],
    required: true,
    description: '查詢結果資料陣列',
    example: [{ id: 'page1', properties: {} }],
  })
  results: any[];
  /**
   * 是否有更多資料
   */
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: true,
    description: '是否有更多資料',
    example: false,
  })
  has_more: boolean;
  /**
   * 下一頁游標
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: '下一頁游標',
    example: 'abcdefg123456',
    default: undefined,
  })
  next_cursor?: string;
}
