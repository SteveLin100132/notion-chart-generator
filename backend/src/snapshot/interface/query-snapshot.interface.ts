/**
 * 動態快照查詢參數介面
 * 用於儲存動態查詢快照所需的參數
 */
export interface QuerySnapshot {
  /** 快照唯一識別碼 */
  id: string;
  /** Notion 資料庫 ID */
  databaseId: string;
  /** 加密的 Notion API Token */
  encryptedToken: string;
  /** X 軸屬性 ID */
  xProperty: string;
  /** Y 軸屬性 ID */
  yProperty: string;
  /** 圖表類型 (如: bar, line, pie 等) */
  chartType: string;
  /** 聚合函數類型 (如: sum, avg, count 等) */
  aggregateFunction: string;
  /** 圖表標題 */
  title: string;
  /** 快照模式 */
  snapshotMode: 'dynamic' | 'static';
  /** 是否為示範資料 */
  isDemo: boolean;
  /** 建立時間戳記 */
  timestamp: number;
  /** 建立日期 (ISO 字串格式) */
  createdAt: string;
  /** 最後更新時間 (ISO 字串格式) */
  lastUpdated?: string;
  /** 篩選條件 (可選) */
  filters?: any;
}
