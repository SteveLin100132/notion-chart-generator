import { Module } from '@nestjs/common';
import { SnapshotController } from './snapshot.controller';
import { SnapshotService } from './snapshot.service';

@Module({
  controllers: [SnapshotController],
  providers: [SnapshotService],
})
export class SnapshotModule {}
