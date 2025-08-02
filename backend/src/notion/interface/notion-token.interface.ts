/**
 * NotionToken 介面
 * 定義 Notion API Token DTO 的結構
 */
export interface NotionToken {
  /**
   * Notion API Token，格式必須為 "secret_" 或 "ntn_" 開頭的字串
   */
  token: string;
}
