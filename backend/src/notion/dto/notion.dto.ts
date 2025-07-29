import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
  Min,
} from 'class-validator';

export class NotionTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class DatabasePropertiesDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  databaseId: string;
}

export class QueryDatabaseDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  databaseId: string;

  @IsOptional()
  @IsObject()
  filter?: any;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;

  @IsOptional()
  @IsString()
  startCursor?: string;
}
