# Changelog

## [1.1.2] - 2025-08-02

### Fixed

- **日期區間驗證修正**

  - 修正「結束日期不能早於開始日期」的驗證，允許 UI 輸入任何日期，並由驗證邏輯統一處理錯誤。
  - 改善日期解析邏輯，支援多種格式，避免因格式問題導致驗證失效。
  - 修正日期驗證在 Query Builder Modal 及條件編輯時的即時反饋，確保錯誤能即時顯示並正確禁用「套用篩選」按鈕。

- **錯誤提示顯示優化**

  - 移除 Query Builder 上方 summary/alert bar 的全域錯誤提示，僅在條件輸入區塊旁顯示即時錯誤。
  - Modal 內仍會顯示所有錯誤列表，並禁用套用按鈕。

- **Query Builder 狀態同步修正**
  - 修正在按下清除篩選按鈕後，進階篩選條件介面沒有重置的問題。
  - 當外部篩選條件被清空時，Query Builder 內部狀態現在會正確同步重置為初始狀態。
  - 確保 Settings Panel 和 Modal 的清除按鈕都能完全重置 Query Builder 的顯示狀態。

### Refactored

- **驗證邏輯重構**
  - 抽離 `getAllFilterErrors` 與 `validateFilterCondition` 至 `lib/filter-validation.ts`，遵守單一職責原則，提升可維護性與可測試性。
  - 驗證邏輯支援遞迴群組與條件，並可擴充更多驗證規則。
  - Query Builder 組件僅負責 UI 呈現與狀態管理，驗證與錯誤提示完全分離。

### Enhanced

- **篩選清除工作流程簡化**

  - Settings Panel 和 Modal 的清除按鈕現在可以一鍵清除所有篩選條件，無需額外確認或點擊套用。
  - 改善使用者體驗，清除操作更加直觀和快速。

- **效能與體驗優化**
  - 在 Modal 中使用 `useMemo` 優化錯誤檢查效能，避免不必要的重算。
  - 改善條件更新與父組件同步邏輯，確保所有狀態與驗證能即時反映。

## [1.1.1] - 2025-08-02

### Fixed

- **Notion API 篩選格式相容性修正**
  - 修正 `convertToNotionFilter` 產生的 filter 結構，確保所有 and/or compound 條件展平成 Notion API 規範的兩層結構，避免巢狀過深導致 500 Internal Server Error 或 Notion API 驗證失敗。
  - 舊 snapshot 若含有不合法巢狀 filter，請刪除並用新版 Query Builder 重新產生。

## [1.1.0] - 2025-08-02

### Added

- **進階篩選功能 (Query Builder)**
  - 新增 Query Builder 組件，支援複雜篩選條件建構
  - 支援多重篩選組合，每組內可設定多個條件
  - 支援 AND/OR 邏輯運算符組合篩選條件
  - **嵌套子群組支援** - 實現無限層級的篩選群組嵌套，完全匹配 Notion 原生篩選介面
  - **Badge 風格選項** - 篩選條件值採用 Badge 樣式呈現，與資料表格風格一致
  - **Notion 官方色彩系統** - 使用 Notion 官方色彩搭配，確保視覺一致性
  - 根據 Notion 屬性類型提供適合的運算符：
    - **數字類型**: 等於(=)、不等於(≠)、大於(>)、小於(<)、大於等於(≥)、小於等於(≤)、為空、不為空
    - **文字類型**: 等於、不等於、包含、不包含、開始於、結束於、為空、不為空
    - **選擇類型**: 等於、不等於、為空、不為空
    - **多選類型**: 包含、不包含、為空、不為空
    - **日期類型**: 等於、不等於、之前、之後、介於、上週、本週、下週、上月、本月、下月、為空、不為空
    - **布林類型**: 等於、不等於
  - 視覺化篩選條件建構器，支援動態新增/刪除條件組
  - **遞歸渲染系統** - 支援嵌套群組的遞歸渲染和管理
  - 自動轉換篩選條件為 Notion API 格式，包含嵌套結構處理

### Enhanced

- **動態快照系統**

  - 後端 API 新增 `filters` 參數支援
  - `CreateQuerySnapshotDto` 新增篩選條件欄位
  - `QuerySnapshot` interface 支援篩選條件儲存
  - 查詢執行時自動套用儲存的篩選條件

- **前端狀態管理**

  - Zustand store 新增篩選條件管理功能
  - 新增 `FilterGroup` 和 `FilterCondition` 類型定義，支援嵌套結構
  - 提供完整的篩選群組操作方法：
    - `addFilterGroup`、`removeFilterGroup`、`updateFilterGroup` - 主群組管理
    - `addSubgroupToGroup`、`removeSubgroupFromGroup` - 子群組管理
    - `updateSubgroupLogicalOperator` - 子群組邏輯運算符管理
    - `addConditionToSubgroup`、`removeConditionFromSubgroup` - 子群組條件管理

- **Query Builder 架構升級**

  - **遞歸群組管理** - 實現支援無限層級嵌套的篩選群組系統
  - **智能 UI 適應** - 子群組採用不同視覺樣式（淺灰背景、左側縮排）
  - **Notion 風格整合** - 按鈕定位和互動行為完全匹配 Notion 原生介面
  - **類型安全保證** - 完整的 TypeScript 類型定義和編譯時檢查

- **設定面板改進**
  - 整合 Query Builder 到圖表設定面板
  - 新增篩選條件區塊，支援進階篩選設定
  - 改善用戶體驗，提供直觀的篩選條件管理介面
  - **響應式設計** - 支援各種螢幕尺寸的篩選介面顯示

## [1.0.9] - 2025-08-01

### Changed

- **快照系統重構** - 簡化為純動態快照架構
  - **BREAKING CHANGE**: 移除靜態快照和快取快照模式
  - 統一使用動態快照，確保資料即時性
  - 移除複雜的快照模式選擇器，提升用戶體驗
  - 簡化分享機制，所有分享連結統一使用動態快照

### Removed

- **移除靜態快照功能**

  - 移除後端 API 端點：
    - `POST /api/snapshots` - 創建靜態快照
    - `GET /api/snapshots/:id` - 獲取靜態快照
    - `DELETE /api/snapshots/cleanup` - 清理過期快照
  - 移除前端靜態快照相關組件和邏輯
  - 移除 `CreateSnapshotDto` 資料傳輸物件
  - 移除快照模式選擇器 UI

- **移除快取快照功能**
  - 完全移除快取快照模式及相關代碼
  - 簡化快照類型定義

### Enhanced

- **分享功能優化**

  - 統一分享連結格式：`?query=query_xxxxx&embed=true`
  - 移除靜態快照分享選項，簡化用戶選擇
  - 所有分享連結自動使用最新的 Notion 資料

- **頁面載入優化**
  - 專注於動態快照載入：`?query=query_xxxxx`
  - 移除靜態快照 URL 參數支援
  - 簡化 URL 處理邏輯

### Added

- **動態快照功能** - 全新的即時資料同步解決方案
  - 動態快照 API 端點：
    - `POST /api/snapshots/query` - 創建動態快照
    - `GET /api/snapshots/query/:id` - 執行動態快照查詢（獲取即時資料）
    - `GET /api/snapshots/query/:id/config` - 獲取動態快照配置
  - API Token 安全加密儲存 (AES-256-CBC)
  - 支援大型資料庫的分頁查詢
  - 完整的錯誤處理和回退機制

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

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
