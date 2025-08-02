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
  /** 原始資料庫資料（用於資料表格顯示） */
  rawData?: any[];
}
