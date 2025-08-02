/**
 * QueryDatabaseResult 介面
 * 定義查詢資料庫內容回應 DTO 的結構
 */
export interface QueryDatabaseResult {
  /**
   * 查詢結果資料陣列
   */
  results: any[];
  /**
   * 是否有更多資料
   */
  has_more: boolean;
  /**
   * 下一頁游標 (可選, string 或 undefined)
   */
  next_cursor?: string;
}
