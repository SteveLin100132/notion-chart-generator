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

**Notion ECharts 視覺化工具** (Notion Database Chart Viewer)

### 專案描述

一個現代化的 Web 應用程式，能夠連接 Notion 資料庫並將資料轉換為互動式圖表。支援多種圖表類型、資料聚合計算、即時分享和跨平台嵌入功能。

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
│                 │    │                 │    │                 │
│   前端 Web App  │◄──►│   Node.js 代理  │◄──►│   Notion API    │
│   (Browser)     │    │   (CORS Proxy)  │    │   (notion.so)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │
│  ECharts.js     │    │  快照儲存系統   │
│  (圖表渲染)     │    │  (JSON Files)   │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
```

### 技術堆疊

#### 前端技術

- **HTML5**: 語義化標記和現代 Web 標準
- **CSS3**: Flexbox、Grid、CSS Variables、動畫效果
- **ES6+ JavaScript**: 模組化、async/await、箭頭函數
- **Apache ECharts 5.4.3**: 圖表渲染引擎

#### 後端技術

- **Node.js 18+**: JavaScript 運行環境
- **Express.js 4.18.2**: Web 應用框架
- **CORS 2.8.5**: 跨域資源共享處理
- **node-fetch 3.3.2**: HTTP 請求處理

#### 開發工具

- **nodemon 3.0.1**: 開發時自動重啟
- **JSDoc 4.0.2**: 文件生成
- **http-server 14.1.1**: 靜態檔案服務

---

## ⚙️ 核心功能

### 1. Notion API 整合

- **Token 驗證**: 支援 `ntn_` 和 `secret_` 格式
- **資料庫列表**: 自動獲取可訪問的資料庫
- **屬性探索**: 動態載入資料庫屬性結構
- **資料查詢**: 支援分頁和過濾條件

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

- **快照生成**: 將圖表資料和設定保存為 JSON 檔案
- **唯一 ID**: 生成時間戳和隨機字串組合的 ID
- **分享連結**: `https://domain.com/?snapshot=ID&embed=true`
- **iframe 嵌入**: 自動生成嵌入代碼
- **跨平台支援**: 任何設備都能正確顯示

### 5. 用戶體驗優化

- **自動儲存**: 設定自動儲存到 localStorage
- **即時預覽**: 選擇變更時即時更新
- **錯誤處理**: 友善的錯誤訊息和建議
- **載入狀態**: 清楚的載入指示器
- **響應式設計**: 適配手機、平板、桌面

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
- **快照生成**: < 500ms
- **記憶體使用**: < 100MB（瀏覽器）

---

## 📡 API 文件

### Notion API 代理端點

#### 1. 獲取資料庫列表

```
POST /api/notion/databases
Content-Type: application/json

{
  "token": "ntn_xxx" 或 "secret_xxx"
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
  "token": "ntn_xxx",
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
  "token": "ntn_xxx",
  "databaseId": "database-id",
  "filter": {}
}

回應:
[
  {
    "properties": {
      "標題": { "title": [{"plain_text": "項目名稱"}] },
      "數量": { "number": 100 }
    }
  }
]
```

### 快照管理 API

#### 1. 保存快照

```
POST /api/snapshots
Content-Type: application/json

{
  "data": [...],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "圖表標題",
  "isDemo": false
}

回應:
{
  "id": "chart_1690000000000_abc123",
  "message": "Snapshot saved successfully",
  "timestamp": 1690000000000
}
```

#### 2. 讀取快照

```
GET /api/snapshots/{id}

回應:
{
  "id": "chart_1690000000000_abc123",
  "data": [...],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "圖表標題",
  "isDemo": false,
  "timestamp": 1690000000000,
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

#### 3. 清理過期快照

```
DELETE /api/snapshots/cleanup?days=7

回應:
{
  "message": "Cleanup completed",
  "deletedCount": 5,
  "errorCount": 0,
  "retentionDays": 7
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

### 快照檔案結構

```json
{
  "id": "chart_1690000000000_abc123",
  "data": [
    {
      "x": "項目1",
      "y": 100,
      "label": "項目1",
      "aggregateFunction": "SUM",
      "originalCount": 3,
      "valueCount": 3
    }
  ],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "銷售統計圖表",
  "isDemo": false,
  "timestamp": 1690000000000,
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

---

## 🎨 使用者介面

### 介面佈局

```
┌─────────────────────────────────────────────────────────┐
│                    頂部面板                              │
│  [Logo] [Demo] [分享按鈕]                    [狀態指示] │
├─────────────────────────────────────────────────────────┤
│           │                                             │
│    側邊    │                                             │
│    設定    │              圖表顯示區域                    │
│    面板    │                                             │
│           │                                             │
│           │                                             │
└─────────────────────────────────────────────────────────┘
```

### 設定面板組件

#### 1. Notion 連接設定

- **Token 輸入**: 密碼類型，支援格式驗證
- **資料庫選擇**: 下拉選單，動態載入
- **載入按鈕**: 獲取可用資料庫列表

#### 2. 圖表設定

- **圖表類型**: 4 種類型選擇器
- **X 軸屬性**: 根據資料庫動態載入
- **Y 軸屬性**: 根據資料庫動態載入
- **聚合函數**: 5 種聚合方式選擇
- **標籤屬性**: 可選的額外標籤

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

1. **Token 保護**

   - 客戶端 localStorage 加密儲存
   - 伺服器端不持久化儲存
   - 支援 Token 格式驗證

2. **API 安全**

   - CORS 限制
   - 請求大小限制
   - 頻率限制 (如需要)

3. **快照安全**
   - 隨機 ID 生成
   - 無法列舉快照
   - 定期清理機制

### 隱私保護

- 不記錄用戶個人資訊
- 快照資料本地儲存
- 可選的資料匿名化

### 輸入驗證

- Token 格式驗證
- 資料庫 ID 驗證
- 屬性名稱檢查
- XSS 防護

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
- **快照操作**: < 500ms
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
cd notion-echart

# 2. 安裝依賴
npm install

# 3. 啟動開發服務器
npm run dev

# 4. 開啟瀏覽器
open http://localhost:3000
```

### 生產部署

#### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### 環境變數

```env
PORT=3000
NODE_ENV=production
SNAPSHOT_RETENTION_DAYS=7
```

### 靜態檔案服務

- **Nginx**: 建議用於生產環境
- **Apache**: 替代選擇
- **CDN**: 建議用於大流量

---

## 👨‍💻 開發指南

### 程式碼結構

```
src/
├── index.html              # 主頁面
├── server.js              # Express 伺服器
├── package.json           # 專案配置
├── js/
│   ├── app.js            # 主應用程式邏輯
│   ├── notion-api.js     # Notion API 處理
│   └── chart-renderer.js # ECharts 圖表渲染
├── snapshots/            # 快照儲存目錄
│   ├── .gitkeep         # 保持目錄存在
│   └── *.json           # 快照檔案
└── docs/                # 文件目錄
    ├── SPECS.md         # 本規格文件
    └── API.md           # API 文件
```

### 開發規範

#### JavaScript 規範

- 使用 ES6+ 語法
- 統一使用 2 空格縮排
- 函數和變數使用 camelCase
- 類別使用 PascalCase
- 常數使用 UPPER_CASE

#### CSS 規範

- 使用 BEM 命名方式
- 變數使用 CSS Custom Properties
- 響應式設計優先
- 語義化 class 名稱

#### API 設計原則

- RESTful API 設計
- 統一的錯誤回應格式
- 完整的輸入驗證
- 詳細的日誌記錄

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
- **快照管理**: 儲存和讀取功能

#### 2. 整合測試

- **API 端點**: 所有 API 端點的完整測試
- **資料流**: 從 Notion 到圖表的完整流程
- **分享功能**: 快照生成和載入的完整流程

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

- **Jest**: JavaScript 測試框架
- **Puppeteer**: 端對端測試
- **Supertest**: API 測試
- **Jest-DOM**: DOM 測試工具

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
