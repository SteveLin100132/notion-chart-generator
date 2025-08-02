/**
 * DatabaseProperties 介面
 * 定義資料庫屬性查詢 DTO 的結構
 */
export interface DatabaseProperties {
  /**
   * Notion API Token，必須具有對指定資料庫的讀取權限
   */
  token: string;
  /**
   * Notion 資料庫的唯一識別碼，格式為 UUID
   */
  databaseId: string;
}
