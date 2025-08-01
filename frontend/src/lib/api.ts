import axios from "axios";
import { Database, DatabaseProperty, ChartData } from "./store";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const notionApi = {
  // 獲取資料庫列表
  async getDatabases(token: string): Promise<Database[]> {
    const response = await api.post("/notion/databases", { token });
    return response.data;
  },

  // 獲取資料庫屬性
  async getDatabaseProperties(
    token: string,
    databaseId: string
  ): Promise<{ id: string; title: string; properties: DatabaseProperty[] }> {
    const response = await api.post("/notion/database-properties", {
      token,
      databaseId,
    });
    return response.data;
  },

  // 查詢資料庫資料
  async queryDatabase(
    token: string,
    databaseId: string,
    filter?: any,
    pageSize?: number,
    startCursor?: string
  ): Promise<{
    results: any[];
    has_more: boolean;
    next_cursor: string | null;
  }> {
    const response = await api.post("/notion/query", {
      token,
      databaseId,
      filter,
      pageSize,
      startCursor,
    });
    return response.data;
  },
};

export const snapshotApi = {
  // 保存動態查詢快照
  async saveQuerySnapshot(data: {
    databaseId: string;
    notionToken: string;
    xProperty: string;
    yProperty: string;
    chartType: string;
    aggregateFunction: string;
    title: string;
    snapshotMode?: "dynamic";
    isDemo?: boolean;
    filters?: any;
  }): Promise<{
    id: string;
    message: string;
    timestamp: number;
    snapshotMode: string;
  }> {
    const response = await api.post("/snapshots/query", data);
    return response.data;
  },

  // 執行動態查詢快照（獲取即時資料）
  async executeQuerySnapshot(id: string): Promise<{
    id: string;
    data: ChartData[];
    chartType: string;
    aggregateFunction: string;
    title: string;
    isDemo: boolean;
    timestamp: number;
    createdAt: string;
    rawData?: any[]; // 添加原始資料欄位
  }> {
    const response = await api.get(`/snapshots/query/${id}`);
    return response.data;
  },

  // 獲取動態查詢快照設定
  async getQuerySnapshotConfig(id: string): Promise<{
    id: string;
    databaseId: string;
    xProperty: string;
    yProperty: string;
    chartType: string;
    aggregateFunction: string;
    title: string;
    snapshotMode: "dynamic";
    isDemo: boolean;
    timestamp: number;
    createdAt: string;
    lastUpdated?: string;
  }> {
    const response = await api.get(`/snapshots/query/${id}/config`);
    return response.data;
  },
};

// 資料處理工具
export const dataProcessor = {
  // 處理 Notion 資料
  processNotionData(
    data: any[],
    xAxisProperty: string,
    yAxisProperty: string,
    labelProperty: string,
    aggregateFunction: string
  ): ChartData[] {
    const processedData: ChartData[] = [];
    const aggregationMap = new Map<
      string,
      { values: number[]; count: number }
    >();

    // 檢查是否為 COUNT 模式
    const isCountMode =
      yAxisProperty === "__count__" || aggregateFunction === "COUNT";

    // 處理每一筆資料
    data.forEach((item) => {
      const properties = item.properties;
      let xValue = this.extractPropertyValue(properties[xAxisProperty]);
      let yValue: number;

      if (isCountMode) {
        // COUNT 模式：每個項目計數為 1
        yValue = 1;
      } else {
        // 正常模式：從 Y 軸屬性提取值
        yValue = this.extractPropertyValue(properties[yAxisProperty]);
        // 確保 Y 軸是數字
        if (typeof yValue === "string") {
          yValue = parseFloat(yValue) || 0;
        }
        if (typeof yValue !== "number") {
          yValue = 0;
        }
      }

      let labelValue = labelProperty
        ? this.extractPropertyValue(properties[labelProperty])
        : xValue;

      // 確保 X 軸是字串
      if (typeof xValue !== "string") {
        xValue = String(xValue || "");
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

      switch (aggregateFunction) {
        case "SUM":
          aggregatedValue = entry.values.reduce((sum, val) => sum + val, 0);
          break;
        case "AVG":
          aggregatedValue =
            entry.values.reduce((sum, val) => sum + val, 0) /
            entry.values.length;
          break;
        case "MIN":
          aggregatedValue = Math.min(...entry.values);
          break;
        case "MAX":
          aggregatedValue = Math.max(...entry.values);
          break;
        case "COUNT":
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

    return processedData;
  },

  // 提取屬性值
  extractPropertyValue(property: any): any {
    if (!property) return "";

    switch (property.type) {
      case "title":
        return property.title?.[0]?.plain_text || "";
      case "rich_text":
        return property.rich_text?.[0]?.plain_text || "";
      case "number":
        return property.number || 0;
      case "select":
        return property.select?.name || "";
      case "multi_select":
        return (
          property.multi_select?.map((item: any) => item.name).join(", ") || ""
        );
      case "date":
        return property.date?.start || "";
      case "checkbox":
        return property.checkbox;
      case "url":
        return property.url || "";
      case "email":
        return property.email || "";
      case "phone_number":
        return property.phone_number || "";
      case "formula":
        return this.extractPropertyValue(property.formula);
      case "rollup":
        return this.extractPropertyValue(property.rollup);
      default:
        return String(property.value || property.plain_text || "");
    }
  },
};
