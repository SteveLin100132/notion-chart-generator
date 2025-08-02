<div align="center">
  <img src="assets/images/notion-chart-generator-logo.png" width="100" />
  <h1>Notion Chart Generator</h1>
  <div>
    <img src="https://img.shields.io/github/package-json/v/stevelin100132/notion-chart-generator">
    <img src="https://img.shields.io/badge/React-18+-61dafb.svg" />
    <img src="https://img.shields.io/badge/Next.js-14+-black.svg" />
    <img src="https://img.shields.io/badge/NestJS-10+-e0234e.svg" />
    <img src="https://img.shields.io/badge/TailwindCSS-3+-38bdf8.svg" />
  </div>
</div>

<br />
一個採用現代前後端分離架構的 Web 應用程式，使用 NestJS + Next.js 技術棧，能夠連接 Notion 資料庫並將資料轉換為美觀的互動式圖表。支援多種圖表類型、資料聚合計算、即時分享和跨平台嵌入功能。
<br />
<br />

![Notion Chart Generator Usage Demo](assets/images/notion-chart-generator-usage-demo.gif)

## 主要功能

### 核心功能

- **Notion API 整合**: 直接連接到您的 Notion 資料庫
- **多種圖表類型**: 長條圖、線圖、圓餅圖、雷達圖
- **資料聚合**: 支援 SUM、AVG、MIN、MAX、COUNT 等聚合計算
- **響應式設計**: 完美適配桌面、平板和手機
- **即時互動**: 懸停、縮放、探索您的資料

### 進階功能

- **進階篩選查詢 (Query Builder)**: 強大的視覺化篩選條件建構器
  - 支援無限層級的嵌套群組，完全匹配 Notion 原生篩選體驗
  - Badge 風格的選項呈現，與資料表格風格保持一致
  - 根據屬性類型智能提供適合的運算符選項
  - 支援 AND/OR 邏輯組合，建構複雜篩選條件
- **分享功能**: 生成分享連結，支援跨平台存取
- **iframe 嵌入**: 輕鬆嵌入到其他應用程式
- **快照系統**: 動態快照技術，確保分享連結始終顯示最新資料
- **持久化儲存**: Kubernetes 持久化卷支援，資料永不丟失
- **表格檢視**: 完整的資料表格檢視，支援橫向滾動和固定側邊欄
- **自訂 UI 組件**: 使用 Radix UI 打造的現代化使用者介面
- **動態選擇**: 自動載入資料庫列表和屬性選擇
- **美觀介面**: 現代化 UI 設計，優秀的用戶體驗

## 快速開始

### 系統需求

- **Node.js**: 18.0.0 或更高版本
- **npm**: 9.0.0 或更高版本
- **瀏覽器**: Chrome 90+、Firefox 88+、Safari 14+、Edge 90+

### 1. 克隆專案

```bash
git clone https://github.com/SteveLin100132/notion-chart-generator.git
cd notion-chart-generator
```

### 2. 安裝依賴

#### 手動安裝

```bash
# 安裝所有依賴 (前端 + 後端)
npm run install:all
```

### 3. 啟動開發服務器

```bash
# 同時啟動前端和後端
npm run dev

# 或分別啟動
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 後端: http://localhost:3001
```

### 4. 開啟應用程式

開啟瀏覽器至 `http://localhost:3000`

## 部署指南

### Docker 部署

專案已包含完整的 Dockerfile 和 docker-compose 配置：

```bash
# 建構 Docker 映像
docker build -t notion-chart-generator .

# 使用 docker-compose 啟動
docker-compose up -d
```

### 環境變數設定

**前端 (.env.local)**:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**後端 (.env)**:

```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=http://localhost:3000
```

## 圖表類型詳解

| 圖表類型   | 適用場景             | X 軸需求  | Y 軸需求 | 聚合功能      |
| ---------- | -------------------- | --------- | -------- | ------------- |
| **長條圖** | 類別比較、數量統計   | 文字/分類 | 數字     | ✅ 全支援     |
| **線圖**   | 趨勢分析、時間序列   | 文字/日期 | 數字     | ✅ 全支援     |
| **圓餅圖** | 比例分析、百分比     | 標籤      | 數字     | ✅ 計數統計   |
| **雷達圖** | 多維度分析、性能評估 | 標籤      | 數字     | ✅ 多指標顯示 |

### 聚合函數說明

- **SUM (加總)**: 將相同 X 軸 值的所有 Y 軸 數值相加
- **AVG (平均值)**: 計算相同 X 軸 值的 Y 軸 數值平均
- **MIN (最小值)**: 找出相同 X 軸 值中的最小 Y 軸 數值
- **MAX (最大值)**: 找出相同 X 軸 值中的最大 Y 軸 數值
- **COUNT (計數)**: 計算相同 X 軸 值出現的次數

### 支援的 Notion 屬性類型

| Notion 屬性      | 支援程度    | 用途     | 篩選支援    | 範例               |
| ---------------- | ----------- | -------- | ----------- | ------------------ |
| **Title**        | ✅ 完全支援 | X 軸標籤 | ✅ 文字篩選 | "產品名稱"         |
| **Rich Text**    | ✅ 完全支援 | 標籤     | ✅ 文字篩選 | "描述文字"         |
| **Number**       | ✅ 完全支援 | Y 軸數值 | ✅ 數值篩選 | 100                |
| **Select**       | ✅ 完全支援 | 分類     | ✅ 選項篩選 | "類別 A"           |
| **Multi-select** | ✅ 完全支援 | 標籤     | ✅ 多選篩選 | "標籤 1, 標籤 2"   |
| **Date**         | ✅ 完全支援 | 時間軸   | ✅ 日期篩選 | "2025-07-29"       |
| **Checkbox**     | ✅ 完全支援 | 二元狀態 | ✅ 布林篩選 | true/false         |
| **URL**          | ✅ 完全支援 | 連結     | ✅ 文字篩選 | "https://..."      |
| **Email**        | ✅ 完全支援 | 聯絡方式 | ✅ 文字篩選 | "user@example.com" |
| **Phone**        | ✅ 完全支援 | 聯絡方式 | ✅ 文字篩選 | "+886-123-456-789" |
| **Formula**      | ⚠️ 部分支援 | 計算結果 | ⚠️ 有限支援 | 依公式而定         |
| **Rollup**       | ⚠️ 部分支援 | 聚合值   | ⚠️ 有限支援 | 依設定而定         |

## Query Builder 進階篩選

### 功能特色

Query Builder 提供強大且直觀的篩選條件建構功能，讓您能夠建立複雜的資料篩選邏輯：

#### **智能篩選條件**

- **屬性類型適應**: 根據不同的 Notion 屬性類型自動提供適合的運算符
- **Badge 風格顯示**: 篩選值採用與資料表格一致的 Badge 樣式呈現
- **即時預覽**: 建構篩選條件時即時預覽篩選結果

#### **嵌套群組支援**

- **無限層級嵌套**: 支援任意深度的篩選群組嵌套結構
- **視覺層次分明**: 子群組採用不同背景色和縮排，清楚顯示層級關係
- **Notion 原生體驗**: 按鈕位置和互動行為完全匹配 Notion 官方介面

#### **邏輯運算組合**

- **AND/OR 運算**: 靈活組合篩選條件，支援複雜邏輯表達
- **群組內運算**: 每個群組內部可設定不同的邏輯運算符
- **跨群組運算**: 群組之間也可設定邏輯關係

### 支援的運算符

| 屬性類型 | 可用運算符                                                                 | 說明                 |
| -------- | -------------------------------------------------------------------------- | -------------------- |
| **數字** | =, ≠, >, <, ≥, ≤, 為空, 不為空                                             | 支援所有數值比較運算 |
| **文字** | 等於, 不等於, 包含, 不包含, 開始於, 結束於, 為空, 不為空                   | 完整的文字搜尋功能   |
| **選擇** | 等於, 不等於, 為空, 不為空                                                 | 單選屬性篩選         |
| **多選** | 包含, 不包含, 為空, 不為空                                                 | 多選標籤篩選         |
| **日期** | 等於, 不等於, 之前, 之後, 上週, 本週, 下週, 上月, 本月, 下月, 為空, 不為空 | 豐富的時間範圍選項   |
| **布林** | 等於, 不等於                                                               | 是/否狀態篩選        |

## Notion 設定

### 建立 Notion 整合

1. 前往 [Notion Integrations](https://www.notion.so/my-integrations)
2. 點擊 "New integration"
3. 為整合命名並選擇您的工作區
4. 複製 "Internal Integration Token"（以 `secret_` 或 `ntn_` 開頭）

### 分享資料庫

1. 開啟您的 Notion 資料庫
2. 點擊右上角的 "Share"
3. 搜尋您的整合名稱並邀請它
4. 確保整合具有讀取權限

### 常見問題

#### ❌ Token 無效

- 確認 Token 以 `secret_` 或 `ntn_` 開頭
- 檢查整合是否為 Active 狀態
- 重新生成 Token 並更新

#### ❌ 找不到資料庫

- 確認資料庫已分享給整合
- 檢查整合是否有讀取權限
- 嘗試重新載入資料庫列表

#### ❌ 圖表無法顯示

- 確認選擇的屬性包含有效資料
- 檢查 Y 軸 屬性是否為數字類型
- 確認資料庫中有資料記錄
