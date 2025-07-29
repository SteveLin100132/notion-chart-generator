import { Controller, Post, Body } from '@nestjs/common';
import { NotionService } from './notion.service';
import {
  NotionTokenDto,
  DatabasePropertiesDto,
  QueryDatabaseDto,
} from './dto/notion.dto';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Post('databases')
  async getDatabases(@Body() dto: NotionTokenDto) {
    return this.notionService.getDatabases(dto.token);
  }

  @Post('database-properties')
  async getDatabaseProperties(@Body() dto: DatabasePropertiesDto) {
    return this.notionService.getDatabaseProperties(dto.token, dto.databaseId);
  }

  @Post('query')
  async queryDatabase(@Body() dto: QueryDatabaseDto) {
    return this.notionService.queryDatabase(
      dto.token,
      dto.databaseId,
      dto.filter,
      dto.pageSize,
      dto.startCursor,
    );
  }
}
