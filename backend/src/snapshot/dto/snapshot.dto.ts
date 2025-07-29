import { IsArray, IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class ChartDataDto {
  @IsString()
  x: string;

  @IsString()
  y: number;

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  aggregateFunction?: string;

  @IsOptional()
  originalCount?: number;

  @IsOptional()
  valueCount?: number;
}

export class CreateSnapshotDto {
  @IsArray()
  data: ChartDataDto[];

  @IsString()
  @IsNotEmpty()
  chartType: string;

  @IsString()
  @IsNotEmpty()
  aggregateFunction: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  isDemo?: boolean;
}
