import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
  Min,
} from 'class-validator';

/**
 * Notion API Token 資料傳輸物件
 *
 * 用於需要 Notion API 認證的基本請求
 * Token 必須是有效的 Notion Integration Token
 */
export class NotionTokenDto {
  /**
   * Notion API Token
   * 格式必須為 "secret_" 或 "ntn_" 開頭的字串
   */
  @IsString()
  @IsNotEmpty()
  token: string;
}

/**
 * 資料庫屬性查詢資料傳輸物件
 *
 * 用於取得特定 Notion 資料庫的屬性結構和詳細資訊
 * 需要提供有效的 API Token 和資料庫 ID
 */
export class DatabasePropertiesDto {
  /**
   * Notion API Token
   * 必須具有對指定資料庫的讀取權限
   */
  @IsString()
  @IsNotEmpty()
  token: string;

  /**
   * Notion 資料庫的唯一識別碼
   * 格式為 UUID (例: 12345678-1234-1234-1234-123456789abc)
   */
  @IsString()
  @IsNotEmpty()
  databaseId: string;
}

/**
 * 資料庫查詢資料傳輸物件
 *
 * 用於查詢 Notion 資料庫內容，支援篩選條件和分頁功能
 * 可指定查詢條件、每頁資料筆數和起始游標位置
 */
export class QueryDatabaseDto {
  /**
   * Notion API Token
   * 必須具有對指定資料庫的讀取權限
   */
  @IsString()
  @IsNotEmpty()
  token: string;

  /**
   * Notion 資料庫的唯一識別碼
   * 格式為 UUID (例: 12345678-1234-1234-1234-123456789abc)
   */
  @IsString()
  @IsNotEmpty()
  databaseId: string;

  /**
   * 查詢篩選條件 (可選)
   * 符合 Notion API 篩選格式的物件
   * 例: { "property": "Status", "status": { "equals": "Done" } }
   */
  @IsOptional()
  @IsObject()
  filter?: any;

  /**
   * 每頁回傳的資料筆數 (可選)
   * 最小值為 1，最大值為 100 (Notion API 限制)
   * 預設值為 100
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;

  /**
   * 分頁游標起始位置 (可選)
   * 用於取得下一頁資料，值來自前一次查詢的 next_cursor
   */
  @IsOptional()
  @IsString()
  startCursor?: string;
}
