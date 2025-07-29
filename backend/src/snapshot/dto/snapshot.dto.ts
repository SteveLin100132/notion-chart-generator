import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

/**
 * 圖表資料傳輸物件
 *
 * 定義圖表中單一資料點的結構，用於驗證和傳輸圖表資料
 * 每個資料點包含 x 軸、y 軸值和標籤等資訊
 */
export class ChartDataDto {
  /** X 軸資料值 (通常為類別或時間) */
  @IsString()
  x: string;

  /** Y 軸數值資料 */
  @IsString()
  y: number;

  /** 資料點的顯示標籤 */
  @IsString()
  label: string;

  /**
   * 聚合函數類型 (可選)
   * 如: sum, avg, count, max, min 等
   */
  @IsOptional()
  @IsString()
  aggregateFunction?: string;

  /** 原始資料筆數 (可選) */
  @IsOptional()
  originalCount?: number;

  /** 值的計數 (可選) */
  @IsOptional()
  valueCount?: number;
}

/**
 * 建立快照資料傳輸物件
 *
 * 用於建立新圖表快照時的資料驗證和傳輸
 * 包含圖表的所有必要資訊，如資料、類型、標題等
 */
export class CreateSnapshotDto {
  /**
   * 圖表資料陣列
   * 包含所有要顯示在圖表中的資料點
   */
  @IsArray()
  data: ChartDataDto[];

  /**
   * 圖表類型
   * 如: bar(長條圖), line(折線圖), pie(圓餅圖), scatter(散佈圖) 等
   */
  @IsString()
  @IsNotEmpty()
  chartType: string;

  /**
   * 聚合函數
   * 資料聚合的方式，如: sum(總和), avg(平均), count(計數) 等
   */
  @IsString()
  @IsNotEmpty()
  aggregateFunction: string;

  /** 圖表標題 */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * 是否為示範資料 (可選)
   * 用於標記測試或範例資料，預設為 false
   */
  @IsOptional()
  @IsBoolean()
  isDemo?: boolean;
}
