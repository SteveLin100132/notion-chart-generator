import { create } from "zustand";
import { FilterGroup } from "@/components/query-builder";

export interface Database {
  id: string;
  title: string;
  properties: string[];
  last_edited_time: string;
}

export interface PropertyOption {
  name: string;
  id: string;
  color: string;
}

export interface DatabaseProperty {
  name: string;
  type: string;
  id: string;
  options?: PropertyOption[]; // 為 select、multi_select、status 類型添加選項
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
export type SnapshotMode = "dynamic";

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

  // 篩選條件
  filterGroups: FilterGroup[];
  setFilterGroups: (groups: FilterGroup[]) => void;
  addFilterGroup: () => void;
  removeFilterGroup: (groupIndex: number) => void;
  updateFilterGroup: (groupIndex: number, group: FilterGroup) => void;

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
  currentSnapshotId: string | null;
  setCurrentSnapshotId: (id: string | null) => void;

  // Modal 狀態
  isQueryBuilderModalOpen: boolean;
  setIsQueryBuilderModalOpen: (isOpen: boolean) => void;
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

  // 篩選條件
  filterGroups: [],
  setFilterGroups: (filterGroups) => set({ filterGroups }),
  addFilterGroup: () =>
    set((state) => ({
      filterGroups: [
        ...state.filterGroups,
        {
          id: Date.now().toString(),
          logicalOperator: "and",
          conditions: [],
        },
      ],
    })),
  removeFilterGroup: (groupIndex) =>
    set((state) => ({
      filterGroups: state.filterGroups.filter(
        (_, index) => index !== groupIndex
      ),
    })),
  updateFilterGroup: (groupIndex, group) =>
    set((state) => ({
      filterGroups: state.filterGroups.map((g, index) =>
        index === groupIndex ? group : g
      ),
    })),

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
  currentSnapshotId: null,
  setCurrentSnapshotId: (currentSnapshotId) => set({ currentSnapshotId }),

  // Modal 狀態
  isQueryBuilderModalOpen: false,
  setIsQueryBuilderModalOpen: (isQueryBuilderModalOpen) =>
    set({ isQueryBuilderModalOpen }),
}));
