import { Injectable, NotFoundException, LoggerService } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  createHash,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';

import { CreateQuerySnapshotDto } from './dto';
import { NotionService } from '../notion/notion.service';
import { Snapshot, QuerySnapshot, QuerySnapshotResult } from './interface';
import { Log4jsLoggerService } from '../logger';

/**
 * 快照服務類別
 * 負責管理圖表快照的建立、讀取和清理操作
 * 所有快照都以 JSON 檔案形式儲存在本地檔案系統中
 */
@Injectable()
export class SnapshotService {
  /**
   * 快照檔案儲存目錄路徑
   * */
  private readonly snapshotDir = join(process.cwd(), 'snapshots');
  /**
   * 動態快照檔案儲存目錄路徑
   */
  private readonly querySnapshotDir = join(
    process.cwd(),
    'snapshots',
    'queries',
  );
  /**
   * 加密密鑰（應該從環境變數取得）
   */
  private readonly encryptionKey =
    process.env.ENCRYPTION_KEY || 'default-key-change-in-production';

  /**
   * 建構函數
   * 初始化服務並確保快照目錄存在
   *
   * @param notionService - Notion 服務實例，用於查詢 Notion 資料庫
   */
  constructor(
    private readonly logger: Log4jsLoggerService,
    private readonly notionService: NotionService,
  ) {
    this.ensureSnapshotDir();
    this.ensureQuerySnapshotDir();
  }

  /**
   * 確保快照目錄存在
   * 如果目錄不存在，會遞迴建立所需的目錄結構
   */
  private async ensureSnapshotDir() {
    try {
      await fs.access(this.snapshotDir);
    } catch {
      await fs.mkdir(this.snapshotDir, { recursive: true });
    }
  }

  /**
   * 確保動態快照目錄存在
   * 如果目錄不存在，會遞迴建立所需的目錄結構
   */
  private async ensureQuerySnapshotDir() {
    try {
      await fs.access(this.querySnapshotDir);
    } catch {
      await fs.mkdir(this.querySnapshotDir, { recursive: true });
    }
  }

  /**
   * 加密 API Token
   * 使用 AES-256-CBC 演算法對敏感資料進行加密
   *
   * @param token - 要加密的 API Token
   * @return 加密後的 Token 字串
   */
  private encryptToken(token: string): string {
    const algorithm = 'aes-256-cbc';
    const key = createHash('sha256').update(this.encryptionKey).digest();
    const iv = randomBytes(16); // 初始化向量

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // 將 IV 和加密資料結合
    return iv.toString('hex') + ':' + encrypted;
  }

  /**
   * 解密 API Token
   * 解密先前加密的 API Token
   *
   * @param encryptedToken - 加密的 API Token
   * @return 解密後的 Token 字串
   */
  private decryptToken(encryptedToken: string): string {
    const algorithm = 'aes-256-cbc';
    const key = createHash('sha256').update(this.encryptionKey).digest();

    // 分離 IV 和加密資料
    const parts = encryptedToken.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted token format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedData = parts[1];

    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * 建立動態查詢快照
   * 儲存查詢參數而非靜態資料，支援即時資料同步
   *
   * @param dto - 建立動態快照所需的資料傳輸物件
   * @returns 包含快照 ID、成功訊息和時間戳記的回應物件
   */
  async createQuerySnapshot(
    dto: CreateQuerySnapshotDto,
  ): Promise<QuerySnapshotResult> {
    const timestamp = Date.now();
    // 產生格式為 "query_{timestamp}_{8位隨機碼}" 的唯一 ID
    const id = `query_${timestamp}_${uuidv4().substring(0, 8)}`;

    // 建立動態快照物件
    const querySnapshot: QuerySnapshot = {
      id,
      databaseId: dto.databaseId,
      encryptedToken: this.encryptToken(dto.notionToken),
      xProperty: dto.xProperty,
      yProperty: dto.yProperty,
      chartType: dto.chartType,
      aggregateFunction: dto.aggregateFunction,
      title: dto.title,
      snapshotMode: dto.snapshotMode || 'dynamic',
      isDemo: dto.isDemo || false,
      timestamp,
      createdAt: new Date().toISOString(),
      filters: dto.filters,
    };

    // 將動態快照寫入 JSON 檔案
    const filePath = join(this.querySnapshotDir, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(querySnapshot, null, 2));

    return {
      id,
      message: 'Query snapshot saved successfully',
      timestamp,
      snapshotMode: querySnapshot.snapshotMode,
    };
  }

  /**
   * 根據 ID 取得動態快照資料
   * 從檔案系統中讀取動態快照並根據模式決定是否即時查詢
   *
   * @param id - 動態快照的唯一識別碼
   * @returns 快照資料物件（可能是快取資料或即時查詢結果）
   * @throws NotFoundException - 當快照檔案不存在時拋出
   */
  async getQuerySnapshot(id: string): Promise<QuerySnapshot> {
    const filePath = join(this.querySnapshotDir, `${id}.json`);

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new NotFoundException('Query snapshot not found');
    }
  }

  /**
   * 執行動態查詢並返回圖表資料
   * 根據快照模式決定是否使用快取或即時查詢 Notion API
   *
   * @param id - 動態快照的唯一識別碼
   * @returns 包含圖表資料和原始資料的標準快照格式
   * @throws NotFoundException - 當快照不存在時拋出
   */
  async executeQuerySnapshot(id: string): Promise<Snapshot> {
    const querySnapshot = await this.getQuerySnapshot(id);

    // 只支援動態模式
    if (querySnapshot.snapshotMode === 'dynamic') {
      try {
        // 解密 API Token
        const notionToken = this.decryptToken(querySnapshot.encryptedToken);

        // 查詢 Notion 資料庫並取得原始資料和處理後資料
        const { processedData, rawData } =
          await this.queryNotionDatabaseWithRaw(
            querySnapshot.databaseId,
            notionToken,
            querySnapshot.xProperty,
            querySnapshot.yProperty,
            querySnapshot.aggregateFunction,
            querySnapshot.filters, // 傳遞篩選條件
          );

        // 返回標準快照格式，並包含原始資料
        return {
          id: querySnapshot.id,
          data: processedData,
          chartType: querySnapshot.chartType,
          aggregateFunction: querySnapshot.aggregateFunction,
          title: querySnapshot.title,
          isDemo: querySnapshot.isDemo,
          timestamp: Date.now(),
          createdAt: new Date().toISOString(),
          rawData: rawData, // 包含原始資料
        };
      } catch (error) {
        this.logger.error('Query snapshot execution error:', error);
        throw new Error(`Failed to execute query snapshot: ${error.message}`);
      }
    }

    // 靜態模式（fallback）
    throw new Error('Static mode query snapshots not yet implemented');
  }

  /**
   * 查詢 Notion 資料庫並返回原始資料和處理後資料
   * 呼叫 Notion API 取得最新的資料庫內容，同時返回原始資料供資料表格使用
   *
   * @param databaseId - Notion 資料庫 ID
   * @param token - Notion API Token
   * @param xProperty - X 軸屬性名稱
   * @param yProperty - Y 軸屬性名稱
   * @param aggregateFunction - 聚合函數
   * @param filters - 篩選條件 (可選)
   * @returns 包含處理後圖表資料和原始資料的物件
   */
  private async queryNotionDatabaseWithRaw(
    databaseId: string,
    token: string,
    xProperty: string,
    yProperty: string,
    aggregateFunction: string,
    filters?: any,
  ): Promise<{ processedData: any[]; rawData: any[] }> {
    try {
      this.logger.log('Querying Notion database with raw data:', {
        databaseId,
        xProperty,
        yProperty,
        aggregateFunction,
        filters: filters ? 'Applied' : 'None',
      });

      // 記錄篩選條件的詳細資訊
      if (filters) {
        this.logger.log('Filter details:', JSON.stringify(filters, null, 2));
      }

      // 查詢資料庫資料 - 獲取所有資料
      let allData: any[] = [];
      let hasMore = true;
      let nextCursor: string | null = null;

      while (hasMore) {
        const response = await this.notionService.queryDatabase(
          token,
          databaseId,
          filters, // 使用傳入的篩選條件
          100, // pageSize
          nextCursor,
        );

        allData = [...allData, ...response.results];
        hasMore = response.has_more;
        nextCursor = response.next_cursor;

        this.logger.log(
          `Fetched ${response.results.length} records, total: ${allData.length}`,
        );
      }

      this.logger.log(`Total records fetched: ${allData.length}`);

      if (allData.length === 0) {
        this.logger.warn('No data found in database');
        return { processedData: [], rawData: [] };
      }

      // 處理資料
      const processedData = this.processNotionData(
        allData,
        xProperty,
        yProperty,
        '', // labelProperty 暫時為空
        aggregateFunction,
      );

      this.logger.log(`Processed data: ${processedData.length} items`);
      this.logger.log(`Raw data: ${allData.length} items`);

      return { processedData, rawData: allData };
    } catch (error) {
      this.logger.error('Error querying Notion database with raw data:', error);
      throw new Error(`Failed to query Notion database: ${error.message}`);
    }
  }

  /**
   * 處理 Notion 資料
   * 將 Notion API 回傳的資料處理成圖表所需的格式
   *
   * @param data - Notion API 回傳的原始資料
   * @param xAxisProperty - X 軸屬性名稱
   * @param yAxisProperty - Y 軸屬性名稱
   * @param labelProperty - 標籤屬性名稱
   * @param aggregateFunction - 聚合函數
   * @returns 處理後的圖表資料
   */
  private processNotionData(
    data: any[],
    xAxisProperty: string,
    yAxisProperty: string,
    labelProperty: string,
    aggregateFunction: string,
  ): any[] {
    const processedData: any[] = [];
    const aggregationMap = new Map<
      string,
      { values: number[]; count: number }
    >();

    // 檢查是否為 COUNT 模式
    const isCountMode =
      yAxisProperty === '__count__' || aggregateFunction === 'COUNT';

    this.logger.log('Processing data with:', {
      xAxisProperty,
      yAxisProperty,
      aggregateFunction,
      isCountMode,
      dataCount: data.length,
    });

    // 處理每一筆資料
    data.forEach((item, index) => {
      const properties = item.properties;

      if (!properties) {
        this.logger.warn(`Item ${index} has no properties`);
        return;
      }

      let xValue = this.extractPropertyValue(properties[xAxisProperty]);
      let yValue: number;

      if (isCountMode) {
        // COUNT 模式：每個項目計數為 1
        yValue = 1;
      } else {
        // 正常模式：從 Y 軸屬性提取值
        yValue = this.extractPropertyValue(properties[yAxisProperty]);
        // 確保 Y 軸是數字
        if (typeof yValue === 'string') {
          yValue = parseFloat(yValue) || 0;
        }
        if (typeof yValue !== 'number') {
          yValue = 0;
        }
      }

      // 確保 X 軸是字串
      if (typeof xValue !== 'string') {
        xValue = String(xValue || '');
      }

      const key = String(xValue);

      if (!aggregationMap.has(key)) {
        aggregationMap.set(key, { values: [], count: 0 });
      }

      const entry = aggregationMap.get(key)!;
      entry.values.push(yValue);
      entry.count++;
    });

    // 計算聚合值
    aggregationMap.forEach((entry, key) => {
      let aggregatedValue: number;

      switch (aggregateFunction.toUpperCase()) {
        case 'SUM':
          aggregatedValue = entry.values.reduce((sum, val) => sum + val, 0);
          break;
        case 'AVG':
          aggregatedValue =
            entry.values.reduce((sum, val) => sum + val, 0) /
            entry.values.length;
          break;
        case 'MIN':
          aggregatedValue = Math.min(...entry.values);
          break;
        case 'MAX':
          aggregatedValue = Math.max(...entry.values);
          break;
        case 'COUNT':
          aggregatedValue = entry.count;
          break;
        default:
          aggregatedValue = entry.values.reduce((sum, val) => sum + val, 0);
      }

      processedData.push({
        x: key,
        y: aggregatedValue,
        label: key,
        aggregateFunction,
        originalCount: entry.count,
        valueCount: entry.values.length,
      });
    });

    this.logger.log('Final processed data:', processedData);
    return processedData;
  }

  /**
   * 提取 Notion 屬性值
   * 根據屬性類型提取對應的值
   *
   * @param property - Notion 屬性物件
   * @returns 提取的屬性值
   */
  private extractPropertyValue(property: any): any {
    if (!property) return '';

    switch (property.type) {
      case 'title':
        return property.title?.[0]?.plain_text || '';
      case 'rich_text':
        return property.rich_text?.[0]?.plain_text || '';
      case 'number':
        return property.number || 0;
      case 'select':
        return property.select?.name || '';
      case 'multi_select':
        return (
          property.multi_select?.map((item: any) => item.name).join(', ') || ''
        );
      case 'date':
        return property.date?.start || '';
      case 'checkbox':
        return property.checkbox;
      case 'url':
        return property.url || '';
      case 'email':
        return property.email || '';
      case 'phone_number':
        return property.phone_number || '';
      case 'formula':
        return this.extractPropertyValue(property.formula);
      case 'rollup':
        return this.extractPropertyValue(property.rollup);
      default:
        return String(property.value || property.plain_text || '');
    }
  }
}
