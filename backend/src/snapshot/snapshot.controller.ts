import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { CreateSnapshotDto } from './dto/snapshot.dto';

@Controller('snapshots')
export class SnapshotController {
  constructor(private readonly snapshotService: SnapshotService) {}

  @Post()
  async createSnapshot(@Body() dto: CreateSnapshotDto) {
    return this.snapshotService.createSnapshot(dto);
  }

  @Get(':id')
  async getSnapshot(@Param('id') id: string) {
    return this.snapshotService.getSnapshot(id);
  }

  @Delete('cleanup')
  async cleanupSnapshots(@Query('days') days?: string) {
    const retentionDays = days ? parseInt(days, 10) : 7;
    return this.snapshotService.cleanupSnapshots(retentionDays);
  }
}
