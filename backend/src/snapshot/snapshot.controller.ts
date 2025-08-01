import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { CreateQuerySnapshotDto } from './dto/snapshot.dto';

/**
 * 快照控制器
 *
 * 提供動態快照管理的 REST API 端點：
 * - POST /snapshots/query - 建立動態查詢快照
 * - GET /snapshots/query/:id - 執行動態快照查詢
 *
 * 動態快照儲存查詢參數而非靜態資料，確保資料即時性
 */
@Controller('snapshots')
export class SnapshotController {
  /**
   * 建構函數
   * 注入快照服務以處理商業邏輯
   *
   * @param snapshotService - 快照服務實例
   */
  constructor(private readonly snapshotService: SnapshotService) {}

  /**
   * 根據 ID 取得特定的快照資料
   *
   * @route GET /snapshots/:id
   * @param id - 快照的唯一識別碼
   * @returns 完整的快照資料物件
   * @throws NotFoundException - 當指定的快照不存在時
   *
   * @example
   * GET /snapshots/chart_1753782323871_766ab85a
   */

  /**
   * 建立動態查詢快照
   *
   * @route POST /snapshots/query
   * @param dto - 建立動態快照所需的資料傳輸物件
   * @returns 包含快照 ID 和建立結果的回應物件
   *
   * @example
   * POST /snapshots/query
   * Body: {
   *   "databaseId": "abc123...",
   *   "notionToken": "secret_...",
   *   "xProperty": "name",
   *   "yProperty": "value",
   *   "chartType": "bar",
   *   "aggregateFunction": "sum",
   *   "title": "動態銷售統計圖",
   *   "snapshotMode": "dynamic"
   * }
   */
  @Post('query')
  async createQuerySnapshot(@Body() dto: CreateQuerySnapshotDto) {
    return this.snapshotService.createQuerySnapshot(dto);
  }

  /**
   * 根據 ID 取得動態快照的資料
   * 會根據快照模式決定是否即時查詢 Notion API
   *
   * @route GET /snapshots/query/:id
   * @param id - 動態快照的唯一識別碼
   * @returns 圖表資料（可能是即時查詢結果或快取資料）
   * @throws NotFoundException - 當指定的快照不存在時
   *
   * @example
   * GET /snapshots/query/query_1753782323871_766ab85a
   */
  @Get('query/:id')
  async executeQuerySnapshot(@Param('id') id: string) {
    return this.snapshotService.executeQuerySnapshot(id);
  }

  /**
   * 根據 ID 取得動態快照的設定
   * 只返回快照的設定資訊，不執行查詢
   *
   * @route GET /snapshots/query/:id/config
   * @param id - 動態快照的唯一識別碼
   * @returns 動態快照的設定資訊（不包含敏感資料）
   * @throws NotFoundException - 當指定的快照不存在時
   *
   * @example
   * GET /snapshots/query/query_1753782323871_766ab85a/config
   */
  @Get('query/:id/config')
  async getQuerySnapshotConfig(@Param('id') id: string) {
    const querySnapshot = await this.snapshotService.getQuerySnapshot(id);

    // 移除敏感資料後返回設定
    const { encryptedToken, ...config } = querySnapshot;
    return config;
  }
}
