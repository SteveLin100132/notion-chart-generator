import { Log4jsLoggerModule, Log4jsLoggerService } from './../logger';
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
  imports: [Log4jsLoggerModule, NotionModule],
  controllers: [SnapshotController],
  providers: [
    SnapshotService,
    {
      provide: Log4jsLoggerService,
      useFactory: () => new Log4jsLoggerService('Snapshot'),
    },
  ],
})
export class SnapshotModule {}
