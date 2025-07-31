# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **動態快照功能** - 全新的即時資料同步解決方案
  - 新增動態快照模式，解決 Notion 資料庫更新後圖表內容不同步的問題
  - 三種快照模式支援：靜態 (static)、動態 (dynamic)、快取 (cached)
  - 動態快照 API 端點：
    - `POST /api/snapshots/query` - 創建動態快照
    - `GET /api/snapshots/query/:id` - 執行動態快照查詢（獲取即時資料）
    - `GET /api/snapshots/query/:id/config` - 獲取動態快照配置
  - API Token 安全加密儲存 (AES-256-CBC)
  - 支援大型資料庫的分頁查詢
  - 完整的錯誤處理和回退機制

### Enhanced

- **分享功能升級**

  - 智能分享：自動判斷創建動態快照或靜態快照
  - 支援動態快照分享連結格式：`?query=query_xxxxx&embed=true`
  - 分享連結自動使用最新的 Notion 資料
  - 回退機制：動態快照失敗時自動切換到靜態模式

- **頁面載入支援**
  - 支援靜態快照載入：`?snapshot=chart_xxxxx`
  - 支援動態快照載入：`?query=query_xxxxx`
  - 動態快照自動執行最新的 Notion 查詢

### Improved

- **Notion 資料處理**

  - 改善資料聚合功能 (SUM, AVG, MIN, MAX, COUNT)
  - 增強屬性值提取邏輯
  - 支援更多 Notion 屬性類型 (formula, rollup 等)
  - 優化大量資料處理效能

- **TypeScript 錯誤修復**
  - 修復雷達圖 tooltip 的 TypeScript 安全性問題
  - 使用防禦性程式設計確保圖表渲染穩定性

### Technical

- **後端架構優化**

  - NestJS 模組依賴注入配置完善
  - SnapshotService 支援 NotionService 整合
  - 加密服務使用現代 crypto API (createCipheriv/createDecipheriv)
  - 移除已棄用的 crypto 函數

- **前端狀態管理**
  - 新增動態快照相關狀態管理
  - 優化分享 URL 處理邏輯
  - 改善使用者體驗流程

## [1.0.8] - 2025-07-31

### Added

- 雷達圖 (Radar Chart) 支援，替換原本的散佈圖
- Kubernetes 持久化儲存支援，用於 snapshot 資料持久化
- 自定義 Checkbox 組件，使用 Radix UI
- 改善的表格佈局，固定設定面板寬度，支援橫向滾動

### Changed

- 圖表類型從 "scatter" 更改為 "radar"
- DataTable 組件重構，改善 Notion 屬性解析和渲染
- 部署配置優化，包含 security context 和 volume mount 設定

### Fixed

- Kubernetes deployment 權限問題修復
- Snapshot 檔案持久化儲存問題修復

## [1.0.4] - 2025-07-31

### Fixed

- 調整健康檢查配置，更新超時和閾值
- 修正部署和服務的健康檢查路徑
- 更新 Ingress 和管理憑證主機名稱

## [1.0.3] - 2025-07-31

### Fixed

- 更新 CORS 設定以允許所有來源
- 修正健康檢查路徑

## [1.0.2] - 2025-07-31

### Fixed

- 修復開發環境 API 重寫邏輯

### Added

- 健康檢查端點和模組

## [1.0.0] - 2025-07-29

### Added

- 🎉 初始發布版本
- **核心功能**：

  - Notion 資料庫連接和查詢
  - 多種圖表類型支援（長條圖、線圖、圓餅圖）
  - 資料聚合功能（SUM、AVG、COUNT、MIN、MAX）
  - 圖表快照功能
  - 資料表格檢視
  - 圖表匯出功能
  - 分享功能

- **UI/UX 功能**：

  - 響應式設計
  - 載入狀態指示器（Skeleton 組件）
  - 設定面板
  - 檢視切換功能
  - 現代化黑白主題設計

- **技術功能**：

  - Docker 容器化支援，包含多階段建構
  - 健康檢查機制
  - Frontend (Next.js 14) + Backend (NestJS) 架構
  - TypeScript 全端支援
  - Kubernetes 部署配置
  - CI/CD 自動化流程（GitHub Actions）
  - GitHub Container Registry 整合

- **資料處理**：

  - 全面的 Notion 屬性類型支援：
    - 基本類型：title, rich_text, number, select, multi_select
    - 進階類型：date, people, files, checkbox, url, email, phone_number
    - 關聯類型：relation, rollup, formula
    - 系統類型：created_time, last_edited_time, created_by, last_edited_by
    - 特殊類型：status, unique_id
  - 結構化資料回傳
  - COUNT 模式圖表生成
  - 資料聚合邏輯增強

- **開發體驗**：

  - 完整的 API 文檔
  - 專案規格文檔
  - Docker Compose 開發環境
  - 程式碼結構重構，提升可讀性和維護性

- **部署與運維**：
  - 完整的 Kubernetes 部署配置
  - Ingress 和憑證管理
  - 健康檢查和存活檢查
  - 生產環境最佳化

### Documentation

- 完整的 README.md 文檔
- API 使用說明
- 部署指南
- 專案規格說明

### Infrastructure

- GitHub Actions CI/CD 流程
- Docker 映像自動建構
- Kubernetes 部署自動化
- GitHub Container Registry 整合

---

## 版本說明

### 版本編號規則

本專案遵循 [語義化版本控制](https://semver.org/lang/zh-TW/)：

- **主版本號**：不相容的 API 修改
- **次版本號**：向下相容的功能新增
- **修訂號**：向下相容的問題修正

### 提交類型說明

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔更新
- `chore`: 建構過程或輔助工具的變動
- `refactor`: 程式碼重構
- `perf`: 效能改善
- `test`: 測試相關

---

_更多詳細變更請參考 [Git Commit History](https://github.com/SteveLin100132/notion-chart-generator/commits/master)_
