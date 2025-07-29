import { Module } from '@nestjs/common';
import { NotionController } from './notion.controller';
import { NotionService } from './notion.service';

/**
 * Notion 模組
 *
 * 此模組負責管理與 Notion API 整合相關的功能，包括：
 * - 與 Notion 資料庫的連接和認證
 * - 提供 RESTful API 端點供前端存取 Notion 資料
 * - 處理 Notion 資料庫的查詢、屬性取得等操作
 * - 管理 Notion API Token 的驗證和錯誤處理
 *
 * @module NotionModule
 */
@Module({
  /** 註冊控制器 - 處理與 Notion 相關的 HTTP 請求和回應 */
  controllers: [NotionController],
  /** 註冊服務提供者 - 處理 Notion API 整合的商業邏輯 */
  providers: [NotionService],
})
export class NotionModule {}
