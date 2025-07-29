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
import { CreateSnapshotDto } from './dto/snapshot.dto';

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
}
