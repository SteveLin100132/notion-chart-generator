import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateSnapshotDto } from './dto/snapshot.dto';

export interface Snapshot {
  id: string;
  data: any[];
  chartType: string;
  aggregateFunction: string;
  title: string;
  isDemo: boolean;
  timestamp: number;
  createdAt: string;
}

@Injectable()
export class SnapshotService {
  private readonly snapshotDir = join(process.cwd(), 'snapshots');

  constructor() {
    this.ensureSnapshotDir();
  }

  private async ensureSnapshotDir() {
    try {
      await fs.access(this.snapshotDir);
    } catch {
      await fs.mkdir(this.snapshotDir, { recursive: true });
    }
  }

  async createSnapshot(dto: CreateSnapshotDto) {
    const timestamp = Date.now();
    const id = `chart_${timestamp}_${uuidv4().substring(0, 8)}`;
    
    const snapshot: Snapshot = {
      id,
      data: dto.data,
      chartType: dto.chartType,
      aggregateFunction: dto.aggregateFunction,
      title: dto.title,
      isDemo: dto.isDemo || false,
      timestamp,
      createdAt: new Date().toISOString(),
    };

    const filePath = join(this.snapshotDir, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(snapshot, null, 2));

    return {
      id,
      message: 'Snapshot saved successfully',
      timestamp,
    };
  }

  async getSnapshot(id: string): Promise<Snapshot> {
    const filePath = join(this.snapshotDir, `${id}.json`);
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new NotFoundException('Snapshot not found');
    }
  }

  async cleanupSnapshots(retentionDays: number = 7) {
    const cutoffTime = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);
    
    try {
      const files = await fs.readdir(this.snapshotDir);
      let deletedCount = 0;
      let errorCount = 0;

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = join(this.snapshotDir, file);
          
          try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const snapshot: Snapshot = JSON.parse(fileContent);
            
            if (snapshot.timestamp < cutoffTime) {
              await fs.unlink(filePath);
              deletedCount++;
            }
          } catch (error) {
            errorCount++;
            console.error(`Error processing file ${file}:`, error);
          }
        }
      }

      return {
        message: 'Cleanup completed',
        deletedCount,
        errorCount,
        retentionDays,
      };
    } catch (error) {
      throw new Error(`Failed to cleanup snapshots: ${error.message}`);
    }
  }
}
