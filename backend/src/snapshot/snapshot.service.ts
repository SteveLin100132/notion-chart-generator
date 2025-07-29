import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateSnapshotDto } from './dto/snapshot.dto';

/**
 * 快照資料介面定義
 * 用於定義儲存在檔案系統中的圖表快照結構
 */
export interface Snapshot {
  /** 快照唯一識別碼 */
  id: string;
  /** 圖表資料陣列 */
  data: any[];
  /** 圖表類型 (如: bar, line, pie 等) */
  chartType: string;
  /** 聚合函數類型 (如: sum, avg, count 等) */
  aggregateFunction: string;
  /** 圖表標題 */
  title: string;
  /** 是否為示範資料 */
  isDemo: boolean;
  /** 建立時間戳記 */
  timestamp: number;
  /** 建立日期 (ISO 字串格式) */
  createdAt: string;
}

/**
 * 快照服務類別
 * 負責管理圖表快照的建立、讀取和清理操作
 * 所有快照都以 JSON 檔案形式儲存在本地檔案系統中
 */
@Injectable()
export class SnapshotService {
  /** 快照檔案儲存目錄路徑 */
  private readonly snapshotDir = join(process.cwd(), 'snapshots');

  /**
   * 建構函數
   * 初始化服務並確保快照目錄存在
   */
  constructor() {
    this.ensureSnapshotDir();
  }

  /**
   * 確保快照目錄存在
   * 如果目錄不存在，會遞迴建立所需的目錄結構
   * @private
   */
  private async ensureSnapshotDir() {
    try {
      await fs.access(this.snapshotDir);
    } catch {
      await fs.mkdir(this.snapshotDir, { recursive: true });
    }
  }

  /**
   * 建立新的快照
   * 產生唯一的 ID，並將圖表資料儲存為 JSON 檔案
   *
   * @param dto - 建立快照所需的資料傳輸物件
   * @returns 包含快照 ID、成功訊息和時間戳記的回應物件
   */
  async createSnapshot(dto: CreateSnapshotDto) {
    const timestamp = Date.now();
    // 產生格式為 "chart_{timestamp}_{8位隨機碼}" 的唯一 ID
    const id = `chart_${timestamp}_${uuidv4().substring(0, 8)}`;

    // 建立快照物件
    const snapshot: Snapshot = {
      id,
      data: dto.data,
      chartType: dto.chartType,
      aggregateFunction: dto.aggregateFunction,
      title: dto.title,
      isDemo: dto.isDemo || false,
      timestamp,
      createdAt: new Date().toISOString(),
    };

    // 將快照寫入 JSON 檔案
    const filePath = join(this.snapshotDir, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(snapshot, null, 2));

    return {
      id,
      message: 'Snapshot saved successfully',
      timestamp,
    };
  }

  /**
   * 根據 ID 取得快照資料
   * 從檔案系統中讀取對應的 JSON 檔案並解析
   *
   * @param id - 快照的唯一識別碼
   * @returns 快照資料物件
   * @throws NotFoundException - 當快照檔案不存在時拋出
   */
  async getSnapshot(id: string): Promise<Snapshot> {
    const filePath = join(this.snapshotDir, `${id}.json`);

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new NotFoundException('Snapshot not found');
    }
  }

  /**
   * 清理過期的快照檔案
   * 根據保留天數刪除超過指定時間的快照檔案
   *
   * @param retentionDays - 快照保留天數，預設為 7 天
   * @returns 包含清理結果統計的回應物件
   * @throws Error - 當清理過程發生錯誤時拋出
   */
  async cleanupSnapshots(retentionDays: number = 7) {
    // 計算截止時間戳記 (當前時間 - 保留天數)
    const cutoffTime = Date.now() - retentionDays * 24 * 60 * 60 * 1000;

    try {
      const files = await fs.readdir(this.snapshotDir);
      let deletedCount = 0;
      let errorCount = 0;

      // 遍歷快照目錄中的所有檔案
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = join(this.snapshotDir, file);

          try {
            // 讀取並解析快照檔案
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const snapshot: Snapshot = JSON.parse(fileContent);

            // 如果快照建立時間早於截止時間，則刪除該檔案
            if (snapshot.timestamp < cutoffTime) {
              await fs.unlink(filePath);
              deletedCount++;
            }
          } catch (error) {
            errorCount++;
            console.error(`Error processing file ${file}:`, error);
          }
        }
      }

      return {
        message: 'Cleanup completed',
        deletedCount,
        errorCount,
        retentionDays,
      };
    } catch (error) {
      throw new Error(`Failed to cleanup snapshots: ${error.message}`);
    }
  }
}
