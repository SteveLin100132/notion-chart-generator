/**
 * GetDatabases 介面
 * 定義取得資料庫清單 DTO 的結構
 */
export interface GetDatabases {
  /**
   * 資料庫 ID
   */
  id: string;
  /**
   * 資料庫標題
   */
  title: string;
  /**
   * 資料庫屬性名稱陣列
   */
  properties: string[];
  /**
   * 最後編輯時間 (ISO 字串)
   */
  last_edited_time: string;
}
