/**
 * 健康狀態資料傳輸物件
 * 用於表示服務的健康狀態和相關資訊
 */
export interface HealthStatus {
  /**
   * 健康狀態
   */
  status: string;
  /**
   * 伺服器時間戳
   */
  timestamp: string;
  /**
   * 服務名稱
   */
  service: string;
}
