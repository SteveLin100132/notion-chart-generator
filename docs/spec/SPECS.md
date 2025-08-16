# Notion ECharts 視覺化工具 - 技術規格文件

**版本**: v2.0.0  
**最後更新**: 2025 年 7 月 29 日  
**文件類型**: 技術規格書

---

## 📋 目錄

1. [專案概述](#專案概述)
2. [系統架構](#系統架構)
3. [核心功能](#核心功能)
4. [技術規格](#技術規格)
5. [API 文件](#api-文件)
6. [資料庫架構](#資料庫架構)
7. [使用者介面](#使用者介面)
8. [安全性](#安全性)
9. [效能要求](#效能要求)
10. [部署指南](#部署指南)
11. [開發指南](#開發指南)
12. [測試策略](#測試策略)

---

## 🎯 專案概述

### 應用程式名稱

**Notion Chart Generator** (Notion Database Chart Visualization Tool)

### 專案描述

一個採用現代前後端分離架構的 Web 應用程式，使用 NestJS + Next.js 技術棧，能夠連接 Notion 資料庫並將資料轉換為互動式圖表。支援多種圖表類型、資料聚合計算、即時分享和跨平台嵌入功能。

### 主要目標

- 🎯 **資料視覺化**: 將 Notion 資料庫資料轉換為美觀的圖表
- 🔄 **資料聚合**: 支援 SUM、AVG、MIN、MAX、COUNT 等聚合計算
- 🔗 **分享功能**: 生成分享連結，支援跨平台存取
- 📱 **響應式設計**: 適應各種螢幕尺寸和設備
- 🔌 **易於整合**: 支援 iframe 嵌入到其他應用程式

### 使用案例

1. **商業分析**: 銷售報表、業績追蹤
2. **專案管理**: 任務進度、團隊績效
3. **內容管理**: 文章統計、用戶參與度
4. **庫存管理**: 產品統計、供應鏈分析
5. **學術研究**: 實驗資料、調查結果

---

## 🏗️ 系統架構

### 整體架構圖

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js 前端   │    │   NestJS 後端   │    │   Notion API    │
│   (Port 3000)   │◄──►│   (Port 3001)   │◄──►│   (notion.so)   │
│                 │    │                 │    │                 │
│ • React 18      │    │ • TypeScript    │    │ • Database API  │
│ • TypeScript    │    │ • Express       │    │ • Search API    │
│ • TailwindCSS   │    │ • Validation    │    │ • Properties    │
│ • Zustand       │    │ • File Storage  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   ECharts 5.4.3 │    │  快照儲存系統   │
│   (圖表渲染)     │    │  (JSON Files)   │
│                 │    │                 │
│ • 響應式圖表     │    │ • 檔案系統      │
│ • 多種圖表類型   │    │ • 定期清理      │
│ • 互動功能      │    │ • 分享連結      │
└─────────────────┘    └─────────────────┘
```

### 技術堆疊

#### 前端技術

- **Next.js 14**: React 框架，支援 App Router
- **React 18**: 現代 React 功能和 Hooks
- **TypeScript**: 靜態類型檢查
- **TailwindCSS**: 實用優先的 CSS 框架
- **Shadcn UI**: 現代 UI 組件庫
- **Zustand**: 輕量級狀態管理
- **Apache ECharts 5.4.3**: 圖表渲染引擎
- **Axios**: HTTP 客戶端
- **Radix UI**: 無障礙 UI 組件

#### 後端技術

- **NestJS 10**: 企業級 Node.js 框架
- **TypeScript**: 靜態類型檢查
- **Express.js**: Web 應用框架 (內建於 NestJS)
- **Class Validator**: 資料驗證
- **Class Transformer**: 資料轉換
- **Axios**: HTTP 客戶端
- **UUID**: 唯一識別碼生成

#### 開發工具

- **Concurrently**: 同時運行多個命令
- **ESLint**: 代碼質量檢查
- **Prettier**: 代碼格式化
- **Jest**: 測試框架
- **Nodemon**: 開發時自動重啟

---

## ⚙️ 核心功能

### 1. Notion API 整合

- **Token 驗證**: 支援 `secret_` 和 `ntn_` 格式，使用 NestJS 驗證管道
- **資料庫列表**: 自動獲取可訪問的資料庫，包含標題和屬性資訊
- **屬性探索**: 動態載入資料庫屬性結構，支援所有 Notion 屬性類型
- **資料查詢**: 支援分頁、過濾條件和排序，遵循 Notion API 規範
- **錯誤處理**: 完整的錯誤處理和使用者友善的錯誤訊息

### 2. 圖表類型支援

| 圖表類型  | 用途       | X 軸要求  | Y 軸要求 | 特殊功能   |
| --------- | ---------- | --------- | -------- | ---------- |
| 📊 長條圖 | 類別比較   | 文字/數字 | 數字     | 聚合計算   |
| 📈 線圖   | 趨勢分析   | 文字/日期 | 數字     | 時間序列   |
| 🥧 圓餅圖 | 比例分析   | 標籤      | 數字     | 百分比顯示 |
| ⚪ 散佈圖 | 相關性分析 | 數字      | 數字     | 雙軸分析   |

### 3. 資料聚合功能

- **SUM (加總)**: 相同 X 軸 值的 Y 軸 數值相加
- **AVG (平均值)**: 計算平均值，適用於績效分析
- **MIN (最小值)**: 找出最小值，適用於成本分析
- **MAX (最大值)**: 找出最大值，適用於峰值分析
- **COUNT (計數)**: 計算資料筆數，適用於頻率分析

### 4. 分享與嵌入系統

- **動態快照**: 儲存查詢參數而非靜態資料，確保資料即時性
- **唯一 ID**: 生成時間戳和隨機字串組合的 ID (例: `query_1753784442310_240887d1`)
- **分享連結**: `http://localhost:3000/?query=ID&embed=true`
- **iframe 嵌入**: 自動生成嵌入代碼，支援響應式設計
- **跨平台支援**: 任何設備都能正確顯示，包含行動裝置最佳化
- **即時資料**: 每次載入都從 Notion 獲取最新資料

### 5. 用戶體驗優化

- **自動儲存**: 設定自動儲存到 localStorage，包含 Token 和圖表設定
- **即時預覽**: 選擇變更時即時更新圖表
- **錯誤處理**: 友善的錯誤訊息和建議，使用 NestJS 驗證
- **載入狀態**: 清楚的載入指示器和進度顯示
- **響應式設計**: 適配手機、平板、桌面，使用 TailwindCSS
- **無障礙設計**: 支援鍵盤操作和螢幕閱讀器

---

## 🔧 技術規格

### 系統需求

#### 客戶端要求

- **瀏覽器**: Chrome 90+、Firefox 88+、Safari 14+、Edge 90+
- **JavaScript**: ES6+ 支援
- **網路**: HTTPS 連線（Notion API 要求）
- **螢幕解析度**: 最小 320px 寬度

#### 伺服器要求

- **Node.js**: 18.0.0 或更高版本
- **記憶體**: 最少 512MB RAM
- **存儲空間**: 最少 100MB（不含快照檔案）
- **網路**: 能訪問 Notion API (api.notion.com)

### 效能指標

- **首次載入**: < 3 秒
- **圖表渲染**: < 1 秒
- **API 回應**: < 2 秒
- **動態快照執行**: < 2 秒
- **記憶體使用**: < 100MB（瀏覽器）

---

## 📡 API 文件

### Notion API 代理端點

#### 1. 獲取資料庫列表

```
POST /api/notion/databases
Content-Type: application/json

{
  "token": "secret_xxx" 或 "ntn_xxx"
}

回應:
[
  {
    "id": "database-id",
    "title": "資料庫名稱",
    "properties": ["屬性1", "屬性2"],
    "last_edited_time": "2025-07-29T10:00:00.000Z"
  }
]
```

#### 2. 獲取資料庫屬性

```
POST /api/notion/database-properties
Content-Type: application/json

{
  "token": "secret_xxx",
  "databaseId": "database-id"
}

回應:
{
  "id": "database-id",
  "title": "資料庫名稱",
  "properties": [
    {
      "name": "標題",
      "type": "title",
      "id": "prop-id"
    }
  ]
}
```

#### 3. 查詢資料庫資料

```
POST /api/notion/query
Content-Type: application/json

{
  "token": "secret_xxx",
  "databaseId": "database-id",
  "filter": {}, // 可選
  "pageSize": 100, // 可選，預設 100
  "startCursor": "string" // 可選，用於分頁
}

回應:
[
  {
    "properties": {
      "標題": { "title": [{"plain_text": "項目名稱"}] },
      "數量": { "number": 100 }
    }
  }
],
"has_more": false,
"next_cursor": null
```

### 動態快照管理 API

#### 1. 建立動態快照

```
POST /api/snapshots/query
Content-Type: application/json

{
  "databaseId": "abc123-def456-ghi789",
  "notionToken": "secret_1234567890abcdef",
  "xProperty": "Name",
  "yProperty": "Amount",
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "動態銷售統計圖",
  "snapshotMode": "dynamic",
  "isDemo": false
}

回應:
{
  "id": "query_1753784442310_240887d1",
  "message": "Dynamic snapshot created successfully",
  "timestamp": 1753784442310,
  "snapshotMode": "dynamic"
}
```

#### 2. 執行動態快照

```
GET /api/snapshots/query/{id}

回應:
{
  "id": "query_1753784442310_240887d1",
  "data": [...],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "動態銷售統計圖",
  "isDemo": false,
  "timestamp": 1753784442310,
  "createdAt": "2025-01-25T10:00:00.000Z",
  "rawData": [...] // 完整的資料庫資料
}
```

#### 3. 取得動態快照設定

```
GET /api/snapshots/query/{id}/config

回應:
回應:
{
  "id": "query_1753784442310_240887d1",
  "databaseId": "abc123-def456-ghi789",
  "xProperty": "Name",
  "yProperty": "Amount",
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "動態銷售統計圖",
  "snapshotMode": "dynamic",
  "isDemo": false,
  "timestamp": 1753784442310,
  "createdAt": "2025-01-25T10:00:00.000Z"
}
```

---

## 💾 資料庫架構

### Notion 屬性類型支援

| Notion 屬性  | JavaScript 類型 | 用途     | 範例                 |
| ------------ | --------------- | -------- | -------------------- |
| Title        | String          | X 軸標籤 | "產品名稱"           |
| Rich Text    | String          | 標籤     | "描述文字"           |
| Number       | Number          | Y 軸數值 | 100                  |
| Select       | String          | 分類     | "類別 A"             |
| Multi-select | Array           | 標籤     | ["標籤 1", "標籤 2"] |
| Date         | String          | 時間軸   | "2025-07-29"         |
| Checkbox     | Boolean         | 二元狀態 | true/false           |
| URL          | String          | 連結     | "https://..."        |
| Email        | String          | 聯絡方式 | "user@example.com"   |
| Phone        | String          | 聯絡方式 | "+886-123-456-789"   |
| Formula      | Mixed           | 計算結果 | 依公式而定           |
| Rollup       | Mixed           | 聚合值   | 依設定而定           |

### 動態快照檔案結構

```json
{
  "id": "query_1753784442310_240887d1",
  "databaseId": "abc123-def456-ghi789",
  "encryptedToken": "encrypted_token_data",
  "xProperty": "Name",
  "yProperty": "Amount",
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "動態銷售統計圖",
  "snapshotMode": "dynamic",
  "isDemo": false,
  "timestamp": 1753784442310,
  "createdAt": "2025-01-25T10:00:00.000Z"
}
```

### 執行結果範例

```json
{
  "id": "query_1753784442310_240887d1",
  "data": [
    {
      "x": "PM Tool (1)",
      "y": 200000,
      "label": "PM Tool (1)",
      "aggregateFunction": "SUM",
      "originalCount": 4,
      "valueCount": 4
    },
    {
      "x": "資料視覺化 (2)",
      "y": 200000,
      "label": "資料視覺化 (2)",
      "aggregateFunction": "SUM",
      "originalCount": 2,
      "valueCount": 2
    }
  ],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "銷售統計圖表",
  "isDemo": false,
  "timestamp": 1753782323871,
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

---

## 🎨 使用者介面

### 介面佈局

```
┌─────────────────────────────────────────────────────────┐
│                    頂部導航欄                            │
│  [Logo] [Demo] [View Switch]        [Share] [Settings] │
├─────────────────────────────────────────────────────────┤
│           │                                             │
│    側邊    │                                             │
│    設定    │              圖表顯示區域                    │
│    面板    │          (ECharts Container)               │
│           │                                             │
│ ┌───────┐ │ ┌─────────────────────────────────────────┐ │
│ │Token  │ │ │                                         │ │
│ │設定   │ │ │           圖表渲染區域                  │ │
│ └───────┘ │ │         (響應式設計)                   │ │
│ ┌───────┐ │ │                                         │ │
│ │資料庫 │ │ │                                         │ │
│ │選擇   │ │ └─────────────────────────────────────────┘ │
│ └───────┘ │                                             │
│ ┌───────┐ │              圖表控制區域                    │
│ │圖表   │ │          [Export] [Zoom] [Reset]          │
│ │設定   │ │                                             │
│ └───────┘ │                                             │
└─────────────────────────────────────────────────────────┘
```

### 設定面板組件

#### 1. Notion 連接設定

- **Token 輸入**: 密碼類型輸入框，支援格式驗證和自動保存
- **資料庫選擇**: 下拉選單，動態載入可用資料庫列表
- **載入按鈕**: 獲取可用資料庫列表，包含錯誤處理
- **連接狀態**: 顯示連接狀態和 Token 有效性
- **清除按鈕**: 清除儲存的 Token 和設定

#### 2. 圖表設定

- **圖表類型**: 4 種類型選擇器 (bar, line, pie, scatter)
- **X 軸屬性**: 根據資料庫動態載入，支援各種 Notion 屬性類型
- **Y 軸屬性**: 根據資料庫動態載入，限制為數字類型屬性
- **聚合函數**: 5 種聚合方式選擇 (SUM, AVG, MIN, MAX, COUNT)
- **標籤屬性**: 可選的額外標籤，增強圖表可讀性
- **圖表標題**: 自訂圖表標題，支援 emoji 和特殊字符

#### 3. 動作按鈕

- **生成圖表**: 主要動作按鈕
- **載入狀態**: 旋轉動畫指示器
- **錯誤顯示**: 紅色錯誤訊息
- **成功提示**: 綠色成功訊息

### 分享模態框

```
┌─────────────────────────────────────────────┐
│  分享圖表                            [X]    │
├─────────────────────────────────────────────┤
│                                             │
│  🔗 直接連結                               │
│  [https://domain.com/?snapshot=...] [複製]   │
│                                             │
│  📋 嵌入代碼                               │
│  [<iframe src="..." ...></iframe>]  [複製]  │
│                                             │
│  💡 此連結可在任何設備上開啟                │
│                                             │
└─────────────────────────────────────────────┘
```

### 響應式設計

#### 桌面版 (≥ 1024px)

- 側邊欄固定在左側
- 圖表佔據主要區域
- 所有控制項完全可見

#### 平板版 (768px - 1023px)

- 側邊欄可摺疊
- 圖表適應中等螢幕
- 優化觸控操作

#### 手機版 (< 768px)

- 側邊欄變為抽屜式
- 垂直佈局
- 大型觸控按鈕

---

## 🔒 安全性

### 資料安全

### 1. **Token 保護**

- 客戶端使用 Zustand 和 localStorage 安全儲存
- 伺服器端不持久化儲存，僅用於 API 請求
- 支援 Token 格式驗證 (secret* 和 ntn* 開頭)
- 自動清除無效或過期的 Token

### 2. **API 安全**

- CORS 限制，僅允許特定來源存取
- 使用 NestJS 內建的請求大小限制
- Class Validator 進行輸入驗證
- 支援 Throttling 限制 API 請求頻率

### 3. **動態快照安全**

- 使用 UUID + 時間戳生成隨機 ID
- 無法列舉或猜測快照 ID
- API Token 使用 AES-256-CBC 加密儲存
- 檔案權限控制，僅應用程式可存取
- 敏感資料不包含在配置 API 回應中

### 隱私保護

- 不記錄用戶個人資訊
- 動態快照僅儲存查詢參數，不儲存實際資料
- Token 加密儲存，無法反向解密
- 可選的資料匿名化

### 輸入驗證

- **NestJS Class Validator**: 自動 DTO 驗證
- **Token 格式驗證**: 確保 Token 格式正確
- **資料庫 ID 驗證**: UUID 格式檢查
- **屬性名稱檢查**: 防止 SQL 注入和 XSS
- **檔案大小限制**: 限制動態快照設定檔案大小
- **XSS 防護**: 自動轉義使用者輸入

---

## ⚡ 效能要求

### 前端效能

- **首次載入**: 3 秒內完成
- **圖表渲染**: 1 秒內完成
- **介面回應**: 100ms 內回饋
- **記憶體使用**: < 100MB

### 後端效能

- **API 回應時間**: < 2 秒
- **並發處理**: 支援 50+ 同時連線
- **動態快照執行**: < 2 秒
- **記憶體使用**: < 512MB

### 網路效能

- **資源壓縮**: Gzip 壓縮
- **快取策略**: 靜態資源快取
- **CDN 支援**: ECharts 使用 CDN

---

## 🚀 部署指南

### 本地開發

```bash
# 1. 克隆專案
git clone <repository-url>
cd notion-chart-generator

# 2. 安裝所有依賴 (前端 + 後端)
npm run install:all

# 3. 啟動開發服務器 (同時啟動前後端)
npm run dev

# 4. 開啟瀏覽器
# 前端: http://localhost:3000
# 後端: http://localhost:3001
```

### 分別啟動前後端

```bash
# 僅啟動前端 (Next.js)
npm run dev:frontend

# 僅啟動後端 (NestJS)
npm run dev:backend

# 建構專案
npm run build

# 啟動生產模式
npm run start
```

### 生產部署

#### Docker 部署

**前端 Dockerfile:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**後端 Dockerfile:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

#### 環境變數

**前端 (.env.local):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=production
```

**後端 (.env):**

```env
PORT=3001
NODE_ENV=production
SNAPSHOT_RETENTION_DAYS=7
CORS_ORIGIN=http://localhost:3000
```

### 靜態檔案服務

- **Nginx**: 建議用於生產環境
- **Apache**: 替代選擇
- **CDN**: 建議用於大流量

---

## 👨‍💻 開發指南

### 程式碼結構

```
notion-chart-generator/
├── frontend/                    # Next.js 前端
│   ├── src/
│   │   ├── app/                # App Router 頁面
│   │   ├── components/         # React 組件
│   │   └── lib/               # 工具函數和狀態管理
│   ├── public/                # 靜態資源
│   └── package.json           # 前端依賴
├── backend/                    # NestJS 後端
│   ├── src/
│   │   ├── notion/            # Notion API 模組
│   │   ├── snapshot/          # 快照管理模組
│   │   └── main.ts           # 應用程式入口
│   ├── snapshots/             # 快照儲存目錄
│   └── package.json           # 後端依賴
├── docs/                      # 專案文件
│   ├── SPECS.md              # 技術規格文件
│   ├── API.md                # API 文件
│   └── DEVELOPMENT.md        # 開發指南
└── package.json              # 根目錄腳本
```

### 開發規範

#### TypeScript 規範

- 使用嚴格的 TypeScript 配置
- 統一使用 2 空格縮排
- 函數和變數使用 camelCase
- 介面和類別使用 PascalCase
- 常數使用 UPPER_CASE
- 啟用 ESLint 和 Prettier

#### React 規範

- 使用函數組件和 Hooks
- 遵循 Next.js App Router 模式
- 使用 TypeScript 定義 Props 類型
- 組件檔案使用 PascalCase
- 自訂 Hooks 使用 use 前綴

#### NestJS 規範

- 使用 Decorator 和 Dependency Injection
- DTO 類別進行資料驗證
- 服務層處理業務邏輯
- 控制器層僅處理 HTTP 請求
- 模組化設計和依賴管理

#### CSS 規範

- 使用 TailwindCSS 實用類別
- 響應式設計優先 (mobile-first)
- 使用 CSS 變數進行主題設計
- 語義化 class 名稱

#### API 設計原則

- RESTful API 設計模式
- 使用 NestJS 統一錯誤處理
- 完整的 DTO 輸入驗證
- 詳細的 API 文件和型別定義
- 遵循 HTTP 狀態碼標準
- 統一的回應格式

### 新功能開發流程

1. **需求分析**: 明確功能需求和使用場景
2. **設計評估**: API 設計和介面設計
3. **開發實作**: 按模組進行開發
4. **測試驗證**: 單元測試和整合測試
5. **文件更新**: 更新相關文件
6. **部署上線**: 漸進式部署

---

## 🧪 測試策略

### 測試類型

#### 1. 單元測試

- **Notion API 處理**: 資料解析和轉換
- **圖表渲染**: 不同圖表類型的渲染
- **聚合計算**: 各種聚合函數的正確性
- **動態快照管理**: 儲存查詢參數和執行功能

#### 2. 整合測試

- **API 端點**: 所有 API 端點的完整測試
- **資料流**: 從 Notion 到圖表的完整流程
- **分享功能**: 動態快照生成和載入的完整流程

#### 3. 端對端測試

- **用戶流程**: 完整的用戶操作流程
- **跨瀏覽器**: 不同瀏覽器的相容性
- **響應式**: 不同螢幕尺寸的顯示效果

### 測試檔案

```
tests/
├── unit/
│   ├── notion-api.test.js
│   ├── chart-renderer.test.js
│   └── aggregation.test.js
├── integration/
│   ├── api-endpoints.test.js
│   └── data-flow.test.js
└── e2e/
    ├── user-journey.test.js
    └── browser-compatibility.test.js
```

### 測試工具建議

- **Jest**: JavaScript/TypeScript 測試框架
- **React Testing Library**: React 組件測試
- **Supertest**: NestJS API 端點測試
- **Playwright**: 端對端測試
- **MSW (Mock Service Worker)**: API 模擬

---

## 📈 路線圖

### v2.1.0 (Q3 2025)

- [ ] 更多圖表類型 (雷達圖、熱力圖)
- [ ] 自訂色彩主題
- [ ] 資料匯出功能 (PNG, SVG, PDF)
- [ ] 圖表動畫效果

### v2.2.0 (Q4 2025)

- [ ] 多資料庫聯合查詢
- [ ] 即時資料更新
- [ ] 使用者帳戶系統
- [ ] 圖表範本庫

### v3.0.0 (Q1 2026)

- [ ] AI 智能圖表建議
- [ ] 進階篩選和查詢
- [ ] 協作功能
- [ ] 行動應用程式

---

## 🤝 貢獻指南

### 如何貢獻

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

### 程式碼審查

- 確保所有測試通過
- 遵循程式碼規範
- 更新相關文件
- 提供清楚的 PR 描述

---

## 📞 聯絡方式

- **專案網址**: [GitHub Repository]
- **問題回報**: [GitHub Issues]
- **功能建議**: [GitHub Discussions]

---

**文件版本**: v2.0.0  
**最後更新**: 2025 年 7 月 29 日  
**維護者**: Development Team
