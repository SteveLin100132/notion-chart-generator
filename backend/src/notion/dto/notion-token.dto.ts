// ...existing code...
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { NotionToken } from '../interface';

/**
 * Notion API Token 資料傳輸物件
 * 用於需要 Notion API 認證的基本請求
 * Token 必須是有效的 Notion Integration Token
 */
export class NotionTokenDto implements NotionToken {
  /**
   * Notion API Token
   * 格式必須為 "secret_" 或 "ntn_" 開頭的字串
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Notion API Token，格式必須為 "secret_" 或 "ntn_" 開頭的字串',
    example: 'secret_xxx',
  })
  token: string;
}
