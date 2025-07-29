import { Controller, Post, Body } from '@nestjs/common';
import { NotionService } from './notion.service';
import {
  NotionTokenDto,
  DatabasePropertiesDto,
  QueryDatabaseDto,
} from './dto/notion.dto';

/**
 * Notion 控制器
 *
 * 提供與 Notion API 整合相關的 RESTful API 端點，包括：
 * - POST /notion/databases - 取得使用者可存取的資料庫清單
 * - POST /notion/database-properties - 取得特定資料庫的屬性結構
 * - POST /notion/query - 查詢資料庫內容和資料
 *
 * 所有端點都使用 POST 方法以確保 API Token 的安全傳輸
 *
 * @controller notion
 */
@Controller('notion')
export class NotionController {
  /**
   * 建構函數
   * 注入 Notion 服務以處理與 Notion API 的整合邏輯
   *
   * @param notionService - Notion 服務實例
   */
  constructor(private readonly notionService: NotionService) {}

  /**
   * 取得使用者可存取的 Notion 資料庫清單
   *
   * @route POST /notion/databases
   * @param dto - 包含 Notion API Token 的資料傳輸物件
   * @returns 資料庫清單，包含 ID、標題、屬性和最後編輯時間
   * @throws UnauthorizedException - 當 API Token 無效時
   * @throws BadRequestException - 當 Token 格式不正確時
   *
   * @example
   * POST /notion/databases
   * Body: {
   *   "token": "secret_xxxxxxxxxxxxxxxxxx"
   * }
   */
  @Post('databases')
  async getDatabases(@Body() dto: NotionTokenDto) {
    return this.notionService.getDatabases(dto.token);
  }

  /**
   * 取得特定資料庫的屬性結構
   *
   * @route POST /notion/database-properties
   * @param dto - 包含 API Token 和資料庫 ID 的資料傳輸物件
   * @returns 資料庫詳細資訊，包含標題和所有欄位的屬性資訊
   * @throws UnauthorizedException - 當 API Token 無效時
   * @throws BadRequestException - 當資料庫不存在或無存取權限時
   *
   * @example
   * POST /notion/database-properties
   * Body: {
   *   "token": "secret_xxxxxxxxxxxxxxxxxx",
   *   "databaseId": "12345678-1234-1234-1234-123456789abc"
   * }
   */
  @Post('database-properties')
  async getDatabaseProperties(@Body() dto: DatabasePropertiesDto) {
    return this.notionService.getDatabaseProperties(dto.token, dto.databaseId);
  }

  /**
   * 查詢資料庫內容
   *
   * @route POST /notion/query
   * @param dto - 包含查詢參數的資料傳輸物件
   * @returns 查詢結果，包含資料列表、分頁資訊和下一頁游標
   * @throws UnauthorizedException - 當 API Token 無效時
   * @throws BadRequestException - 當資料庫不存在或無存取權限時
   *
   * @example
   * POST /notion/query
   * Body: {
   *   "token": "secret_xxxxxxxxxxxxxxxxxx",
   *   "databaseId": "12345678-1234-1234-1234-123456789abc",
   *   "filter": { // 可選的篩選條件
   *     "property": "Status",
   *     "status": { "equals": "Done" }
   *   },
   *   "pageSize": 50,        // 可選，預設 100
   *   "startCursor": "xxx"   // 可選，用於分頁
   * }
   */
  @Post('query')
  async queryDatabase(@Body() dto: QueryDatabaseDto) {
    return this.notionService.queryDatabase(
      dto.token,
      dto.databaseId,
      dto.filter,
      dto.pageSize,
      dto.startCursor,
    );
  }
}
