import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

/**
 * Notion 服務類別
 *
 * 提供與 Notion API 整合的功能，包括：
 * - 取得使用者可存取的資料庫清單
 * - 取得資料庫的屬性結構
 * - 查詢資料庫內容和資料
 * - 處理 Notion API 認證和錯誤處理
 *
 * @service NotionService
 */
@Injectable()
export class NotionService {
  /** Notion API 的 Axios 實例，預設配置好基本設定 */
  private readonly notionApi: AxiosInstance;

  /**
   * 建構函數
   * 初始化 Notion API 客戶端，設定基本的 URL 和請求標頭
   */
  constructor() {
    this.notionApi = axios.create({
      baseURL: 'https://api.notion.com/v1',
      headers: {
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 驗證 Notion API Token 格式
   * 確保 Token 符合 Notion 的標準格式要求
   *
   * @param token - Notion API Token
   * @throws BadRequestException - 當 Token 格式不正確時拋出
   * @private
   */
  private validateToken(token: string): void {
    if (!token || (!token.startsWith('secret_') && !token.startsWith('ntn_'))) {
      throw new BadRequestException(
        'Invalid token format. Token must start with "secret_" or "ntn_"',
      );
    }
  }

  /**
   * 產生 Notion API 認證標頭
   *
   * @param token - Notion API Token
   * @returns 包含 Authorization 標頭的物件
   * @private
   */
  private getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * 取得使用者可存取的資料庫清單
   * 透過 Notion API 搜尋功能取得所有可存取的資料庫
   *
   * @param token - Notion API Token
   * @returns 資料庫清單，包含 ID、標題、屬性和最後編輯時間
   * @throws UnauthorizedException - 當 Token 無效時
   * @throws HttpException - 當 API 請求失敗時
   */
  async getDatabases(token: string) {
    this.validateToken(token);

    try {
      const response = await this.notionApi.post(
        '/search',
        {
          filter: {
            property: 'object',
            value: 'database',
          },
        },
        {
          headers: this.getAuthHeaders(token),
        },
      );

      // 將原始回應轉換為簡化的資料庫資訊
      return response.data.results.map((db: any) => ({
        id: db.id,
        title: this.extractTitle(db.title),
        properties: Object.keys(db.properties || {}),
        last_edited_time: db.last_edited_time,
      }));
    } catch (error) {
      // 處理認證錯誤
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid Notion token');
      }
      // 處理其他 HTTP 錯誤
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch databases',
        error.response?.status || 500,
      );
    }
  }

  /**
   * 取得特定資料庫的屬性結構
   * 獲取資料庫的詳細資訊，包括所有欄位的名稱、類型和 ID
   *
   * @param token - Notion API Token
   * @param databaseId - 資料庫的唯一識別碼
   * @returns 資料庫詳細資訊，包含標題和屬性清單
   * @throws UnauthorizedException - 當 Token 無效時
   * @throws BadRequestException - 當資料庫不存在或無存取權限時
   * @throws HttpException - 當 API 請求失敗時
   */
  async getDatabaseProperties(token: string, databaseId: string) {
    this.validateToken(token);

    try {
      const response = await this.notionApi.get(`/databases/${databaseId}`, {
        headers: this.getAuthHeaders(token),
      });

      // 轉換屬性資料為簡化格式
      const properties = Object.entries(response.data.properties || {}).map(
        ([name, property]: [string, any]) => ({
          name,
          type: property.type,
          id: property.id || name,
        }),
      );

      return {
        id: response.data.id,
        title: this.extractTitle(response.data.title),
        properties,
      };
    } catch (error) {
      // 處理認證錯誤
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid Notion token');
      }
      // 處理資料庫不存在或無權限錯誤
      if (error.response?.status === 404) {
        throw new BadRequestException(
          'Database not found or no access permission',
        );
      }
      // 處理其他 HTTP 錯誤
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch database properties',
        error.response?.status || 500,
      );
    }
  }

  /**
   * 查詢資料庫內容
   * 從指定的 Notion 資料庫中查詢資料，支援篩選、分頁等功能
   *
   * @param token - Notion API Token
   * @param databaseId - 資料庫的唯一識別碼
   * @param filter - 查詢篩選條件 (可選)
   * @param pageSize - 每頁回傳的資料筆數，預設為 100
   * @param startCursor - 分頁游標，用於取得下一頁資料 (可選)
   * @returns 查詢結果，包含資料、是否有更多資料和下一頁游標
   * @throws UnauthorizedException - 當 Token 無效時
   * @throws BadRequestException - 當資料庫不存在或無存取權限時
   * @throws HttpException - 當 API 請求失敗時
   */
  async queryDatabase(
    token: string,
    databaseId: string,
    filter?: any,
    pageSize: number = 100,
    startCursor?: string,
  ) {
    this.validateToken(token);

    try {
      // 建立查詢請求主體
      const requestBody: any = {
        filter,
        page_size: pageSize,
      };

      // 如果有提供游標，加入分頁參數
      if (startCursor) {
        requestBody.start_cursor = startCursor;
      }

      const response = await this.notionApi.post(
        `/databases/${databaseId}/query`,
        requestBody,
        {
          headers: this.getAuthHeaders(token),
        },
      );

      return {
        results: response.data.results,
        has_more: response.data.has_more,
        next_cursor: response.data.next_cursor,
      };
    } catch (error) {
      // 處理認證錯誤
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid Notion token');
      }
      // 處理資料庫不存在或無權限錯誤
      if (error.response?.status === 404) {
        throw new BadRequestException(
          'Database not found or no access permission',
        );
      }
      // 處理其他 HTTP 錯誤
      throw new HttpException(
        error.response?.data?.message || 'Failed to query database',
        error.response?.status || 500,
      );
    }
  }

  /**
   * 從 Notion 標題陣列中提取純文字標題
   * 處理 Notion API 回傳的標題格式，提取可讀的文字內容
   *
   * @param titleArray - Notion API 回傳的標題陣列
   * @returns 提取的純文字標題，如果無法提取則回傳 'Untitled'
   * @private
   */
  private extractTitle(titleArray: any[]): string {
    if (!titleArray || !Array.isArray(titleArray) || titleArray.length === 0) {
      return 'Untitled';
    }
    return titleArray[0]?.plain_text || 'Untitled';
  }
}
