/**
 * GetDatabaseProperties 介面
 * 定義取得資料庫屬性結構 DTO 的結構
 */
export interface GetDatabaseProperties {
  /**
   * 資料庫 ID
   */
  id: string;
  /**
   * 資料庫標題
   */
  title: string;
  /**
   * 資料庫屬性清單 (型別依 Notion API 回傳)
   */
  properties: any[];
}
