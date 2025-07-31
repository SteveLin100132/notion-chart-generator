import { create } from "zustand";

export interface Database {
  id: string;
  title: string;
  properties: string[];
  last_edited_time: string;
}

export interface DatabaseProperty {
  name: string;
  type: string;
  id: string;
}

export interface ChartData {
  x: string | number;
  y: number;
  label: string;
  aggregateFunction?: string;
  originalCount?: number;
  valueCount?: number;
}

export type ChartType = "bar" | "line" | "pie" | "radar";
export type AggregateFunction = "SUM" | "AVG" | "MIN" | "MAX" | "COUNT";
export type SnapshotMode = "static" | "dynamic" | "cached";

interface NotionState {
  // Notion 連接
  token: string;
  setToken: (token: string) => void;

  // 資料庫
  databases: Database[];
  setDatabases: (databases: Database[]) => void;
  selectedDatabase: string;
  setSelectedDatabase: (databaseId: string) => void;

  // 資料庫屬性
  databaseProperties: DatabaseProperty[];
  setDatabaseProperties: (properties: DatabaseProperty[]) => void;

  // 圖表設定
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  xAxisProperty: string;
  setXAxisProperty: (property: string) => void;
  yAxisProperty: string;
  setYAxisProperty: (property: string) => void;
  labelProperty: string;
  setLabelProperty: (property: string) => void;
  aggregateFunction: AggregateFunction;
  setAggregateFunction: (func: AggregateFunction) => void;

  // 圖表資料
  chartData: ChartData[];
  setChartData: (data: ChartData[]) => void;

  // 原始資料庫資料
  rawDatabaseData: any[];
  setRawDatabaseData: (data: any[]) => void;

  // 分頁狀態
  tableData: any[];
  setTableData: (data: any[]) => void;
  hasMoreData: boolean;
  setHasMoreData: (hasMore: boolean) => void;
  nextCursor: string | null;
  setNextCursor: (cursor: string | null) => void;
  isLoadingMore: boolean;
  setIsLoadingMore: (loading: boolean) => void;

  // UI 狀態
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // 分享
  shareUrl: string | null;
  setShareUrl: (url: string | null) => void;

  // 動態快照設定
  snapshotMode: SnapshotMode;
  setSnapshotMode: (mode: SnapshotMode) => void;
  cacheExpireMinutes: number;
  setCacheExpireMinutes: (minutes: number) => void;
  currentSnapshotId: string | null;
  setCurrentSnapshotId: (id: string | null) => void;
}

export const useNotionStore = create<NotionState>((set) => ({
  // Notion 連接
  token: "",
  setToken: (token) => set({ token }),

  // 資料庫
  databases: [],
  setDatabases: (databases) => set({ databases }),
  selectedDatabase: "",
  setSelectedDatabase: (selectedDatabase) => set({ selectedDatabase }),

  // 資料庫屬性
  databaseProperties: [],
  setDatabaseProperties: (databaseProperties) => set({ databaseProperties }),

  // 圖表設定
  chartType: "bar",
  setChartType: (chartType) => set({ chartType }),
  xAxisProperty: "",
  setXAxisProperty: (xAxisProperty) => set({ xAxisProperty }),
  yAxisProperty: "",
  setYAxisProperty: (yAxisProperty) => set({ yAxisProperty }),
  labelProperty: "",
  setLabelProperty: (labelProperty) => set({ labelProperty }),
  aggregateFunction: "SUM",
  setAggregateFunction: (aggregateFunction) => set({ aggregateFunction }),

  // 圖表資料
  chartData: [],
  setChartData: (chartData) => set({ chartData }),

  // 原始資料庫資料
  rawDatabaseData: [],
  setRawDatabaseData: (rawDatabaseData) => set({ rawDatabaseData }),

  // 分頁狀態
  tableData: [],
  setTableData: (tableData) => set({ tableData }),
  hasMoreData: false,
  setHasMoreData: (hasMoreData) => set({ hasMoreData }),
  nextCursor: null,
  setNextCursor: (nextCursor) => set({ nextCursor }),
  isLoadingMore: false,
  setIsLoadingMore: (isLoadingMore) => set({ isLoadingMore }),

  // UI 狀態
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),

  // 分享
  shareUrl: null,
  setShareUrl: (shareUrl) => set({ shareUrl }),

  // 動態快照設定
  snapshotMode: "dynamic",
  setSnapshotMode: (snapshotMode) => set({ snapshotMode }),
  cacheExpireMinutes: 60,
  setCacheExpireMinutes: (cacheExpireMinutes) => set({ cacheExpireMinutes }),
  currentSnapshotId: null,
  setCurrentSnapshotId: (currentSnapshotId) => set({ currentSnapshotId }),
}));
