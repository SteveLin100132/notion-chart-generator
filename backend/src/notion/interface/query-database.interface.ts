/**
 * QueryDatabase 介面
 * 定義資料庫查詢 DTO 的結構
 */
export interface QueryDatabase {
  /**
   * Notion API Token，必須具有對指定資料庫的讀取權限
   */
  token: string;
  /**
   * Notion 資料庫的唯一識別碼，格式為 UUID
   */
  databaseId: string;
  /**
   * 查詢篩選條件 (可選)
   */
  filter?: any;
  /**
   * 每頁回傳的資料筆數 (可選)
   */
  pageSize?: number;
  /**
   * 分頁游標起始位置 (可選)
   */
  startCursor?: string;
}
