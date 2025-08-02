import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

/**
 * 查詢參數快照資料傳輸物件
 * 用於建立基於查詢參數的動態快照
 * 儲存查詢條件而非靜態資料，確保資料即時性
 */
export class CreateQuerySnapshot {
  /**
   * Notion 資料庫 ID
   */
  databaseId: string;
  /**
   * Notion API Token (加密儲存)
   */
  notionToken: string;
  /**
   * X 軸屬性 ID
   */
  xProperty: string;
  /**
   * Y 軸屬性 ID
   */
  yProperty: string;
  /**
   * 圖表類型
   * 如: bar(長條圖), line(折線圖), pie(圓餅圖), radar(雷達圖) 等
   */
  chartType: string;
  /**
   * 聚合函數
   * 資料聚合的方式，如: sum(總和), avg(平均), count(計數) 等
   */
  aggregateFunction: string;
  /**
   * 圖表標題
   */
  title: string;
  /**
   * 快照模式
   * dynamic: 動態快照 (即時查詢)
   */
  snapshotMode?: 'dynamic';
  /**
   * 是否為示範資料 (可選)
   * 用於標記測試或範例資料，預設為 false
   */
  isDemo?: boolean;
  /**
   * 篩選條件 (可選)
   * 用於過濾資料庫查詢結果的條件
   */
  filters?: any;
}
