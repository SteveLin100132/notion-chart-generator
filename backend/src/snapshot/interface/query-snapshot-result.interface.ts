/**
 * QuerySnapshotResult 接口定義
 * 用於表示查詢快照的結果結構
 */
export interface QuerySnapshotResult {
  /**
   * 快照唯一識別碼
   */
  id: string;
  /**
   * 成功訊息
   */
  message: string;
  /**
   * 建立時間戳記
   */
  timestamp: number;
  /**
   * 快照模式
   */
  snapshotMode: string;
}
