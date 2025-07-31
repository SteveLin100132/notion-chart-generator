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
import { CreateSnapshotDto, CreateQuerySnapshotDto } from './dto/snapshot.dto';

/**
 * 快照控制器
 *
 * 提供圖表快照相關的 RESTful API 端點，包括：
 * - POST /snapshots - 建立新的快照
 * - GET /snapshots/:id - 根據 ID 取得快照
 * - DELETE /snapshots/cleanup - 清理過期快照
 *
 * @controller snapshots
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
   * 建立新的圖表快照
   *
   * @route POST /snapshots
   * @param dto - 建立快照所需的資料傳輸物件
   * @returns 包含快照 ID 和建立結果的回應物件
   *
   * @example
   * POST /snapshots
   * Body: {
   *   "data": [...],
   *   "chartType": "bar",
   *   "aggregateFunction": "sum",
   *   "title": "銷售統計圖",
   *   "isDemo": false
   * }
   */
  @Post()
  async createSnapshot(@Body() dto: CreateSnapshotDto) {
    return this.snapshotService.createSnapshot(dto);
  }

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
  @Get(':id')
  async getSnapshot(@Param('id') id: string) {
    return this.snapshotService.getSnapshot(id);
  }

  /**
   * 清理過期的快照檔案
   *
   * @route DELETE /snapshots/cleanup
   * @param days - 查詢參數，指定保留天數 (可選，預設為 7 天)
   * @returns 清理作業的執行結果統計
   *
   * @example
   * DELETE /snapshots/cleanup?days=14
   * 清理超過 14 天的快照檔案
   *
   * DELETE /snapshots/cleanup
   * 使用預設值清理超過 7 天的快照檔案
   */
  @Delete('cleanup')
  async cleanupSnapshots(@Query('days') days?: string) {
    const retentionDays = days ? parseInt(days, 10) : 7;
    return this.snapshotService.cleanupSnapshots(retentionDays);
  }

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
   *   "snapshotMode": "dynamic",
   *   "cacheExpireMinutes": 60
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
