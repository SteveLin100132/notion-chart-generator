import { Module } from '@nestjs/common';
import { SnapshotController } from './snapshot.controller';
import { SnapshotService } from './snapshot.service';
import { NotionModule } from '../notion/notion.module';

/**
 * 快照模組
 *
 * 此模組負責管理圖表快照相關的功能，包括：
 * - 快照的建立、讀取和管理
 * - 提供 RESTful API 端點供前端應用使用
 * - 處理快照檔案的儲存和清理作業
 * - 整合 Notion API 以支援動態快照功能
 *
 * @module SnapshotModule
 */
@Module({
  /** 導入必要的模組 */
  imports: [NotionModule],
  /** 註冊控制器 - 處理 HTTP 請求和回應 */
  controllers: [SnapshotController],
  /** 註冊服務提供者 - 處理商業邏輯和資料操作 */
  providers: [SnapshotService],
})
export class SnapshotModule {}
