import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotionModule } from './notion/notion.module';
import { SnapshotModule } from './snapshot/snapshot.module';

/**
 * 應用程式的根模組。
 *
 * @remarks
 * 此模組匯入並設定全域的 `ConfigModule`，以及 `NotionModule` 和 `SnapshotModule`。
 * `ConfigModule` 設為全域，使設定值可在整個應用程式中存取。
 *
 * @module AppModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotionModule,
    SnapshotModule,
  ],
})
export class AppModule {}
