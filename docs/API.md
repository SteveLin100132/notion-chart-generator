# API 參考文件

本文件詳細說明了 Notion Chart Generator 的所有 API 端點。

## 🌐 基本資訊

- **前端 URL**: `http://localhost:3000` (Next.js)
- **後端 API URL**: `http://localhost:3001` (NestJS)
- **API 前綴**: `/api`
- **API 版本**: v2.0.0
- **Content-Type**: `application/json`
- **Notion API 版本**: `2022-06-28`

## 🏗️ 架構概述

本專案採用前後端分離架構：

- **前端**: Next.js 14 + React 18 + TypeScript
- **後端**: NestJS 10 + Express + TypeScript
- **圖表引擎**: Apache ECharts 5.4.3
- **狀態管理**: Zustand
- **UI 框架**: TailwindCSS + Shadcn UI

---

## 📡 Notion API 代理端點

所有 Notion API 請求都透過 NestJS 後端代理處理，以解決 CORS 問題並提供統一的錯誤處理與資料驗證。

### 1. 獲取資料庫列表

**端點**: `POST /api/notion/databases`

**描述**: 獲取當前 token 可存取的所有 Notion 資料庫列表

**請求格式**:

```json
{
  "token": "secret_xxx" // 或 "ntn_xxx"
}
```

**請求範例**:

```bash
curl -X POST http://localhost:3001/api/notion/databases \
  -H "Content-Type: application/json" \
  -d '{
    "token": "secret_1234567890abcdef"
  }'
```

**成功回應** (200):

```json
[
  {
    "id": "a8aec433-84f4-47ed-8439-0e8e42c2e089",
    "title": "銷售資料庫",
    "properties": ["產品名稱", "銷售額", "日期", "區域"],
    "last_edited_time": "2025-07-29T10:00:00.000Z"
  },
  {
    "id": "b9bfc544-95e5-58fe-9540-1f9f53d3f190",
    "title": "客戶資料庫",
    "properties": ["客戶姓名", "聯絡方式", "購買金額"],
    "last_edited_time": "2025-07-28T15:30:00.000Z"
  }
]
```

**錯誤回應** (400):

```json
{
  "error": "Invalid token format",
  "code": "INVALID_TOKEN"
}
```

**錯誤回應** (401):

```json
{
  "error": "Unauthorized - Invalid Notion token",
  "code": "UNAUTHORIZED"
}
```

### 2. 獲取資料庫屬性

**端點**: `POST /api/notion/database-properties`

**描述**: 獲取指定資料庫的詳細屬性資訊

**請求格式**:

```json
{
  "token": "secret_xxx",
  "databaseId": "database-uuid"
}
```

**請求範例**:

```bash
curl -X POST http://localhost:3001/api/notion/database-properties \
  -H "Content-Type: application/json" \
  -d '{
    "token": "secret_1234567890abcdef",
    "databaseId": "a8aec433-84f4-47ed-8439-0e8e42c2e089"
  }'
```

**成功回應** (200):

```json
{
  "id": "a8aec433-84f4-47ed-8439-0e8e42c2e089",
  "title": "銷售資料庫",
  "properties": [
    {
      "name": "產品名稱",
      "type": "title",
      "id": "title"
    },
    {
      "name": "銷售額",
      "type": "number",
      "id": "prop_1"
    },
    {
      "name": "日期",
      "type": "date",
      "id": "prop_2"
    },
    {
      "name": "區域",
      "type": "select",
      "id": "prop_3"
    }
  ]
}
```

### 3. 查詢資料庫資料

**端點**: `POST /api/notion/query`

**描述**: 查詢指定資料庫的所有資料記錄

**請求格式**:

```json
{
  "token": "secret_xxx",
  "databaseId": "database-uuid",
  "filter": {}, // 可選的過濾條件
  "pageSize": 100, // 可選，預設 100，最大 100
  "startCursor": "string" // 可選，用於分頁
}
```

**請求範例**:

```bash
curl -X POST http://localhost:3001/api/notion/query \
  -H "Content-Type: application/json" \
  -d '{
    "token": "secret_1234567890abcdef",
    "databaseId": "a8aec433-84f4-47ed-8439-0e8e42c2e089",
    "filter": {
      "property": "區域",
      "select": {
        "equals": "台北"
      }
    },
    "pageSize": 50
  }'
```

**成功回應** (200):

```json
[
  {
    "id": "page-uuid-1",
    "properties": {
      "產品名稱": {
        "title": [{ "plain_text": "產品A" }]
      },
      "銷售額": {
        "number": 15000
      },
      "日期": {
        "date": {
          "start": "2025-07-29"
        }
      },
      "區域": {
        "select": {
          "name": "台北"
        }
      }
    }
  }
],
"has_more": false,
"next_cursor": null
```

---

## 💾 快照管理 API

快照系統用於保存和分享圖表配置及資料，採用檔案系統儲存。

### 1. 建立動態查詢快照

**端點**: `POST /api/snapshots/query`

**描述**: 建立動態查詢快照，支援即時資料同步

**請求格式**:

```json
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
```

**欄位說明**:

- `databaseId`: Notion 資料庫 ID
- `notionToken`: Notion API Token (會被加密儲存)
- `xProperty`: X 軸屬性名稱
- `yProperty`: Y 軸屬性名稱
- `chartType`: 圖表類型 (`bar`, `line`, `pie`, `radar`)
- `aggregateFunction`: 聚合函數 (`SUM`, `AVG`, `MIN`, `MAX`, `COUNT`)
- `title`: 圖表標題
- `snapshotMode`: 快照模式 (`static`, `dynamic`, `cached`)
- `cacheExpireMinutes`: 快取過期時間（分鐘，僅 cached 模式使用）
- `isDemo`: 是否為示範資料

**請求範例**:

```bash
curl -X POST http://localhost:3001/api/snapshots/query \
  -H "Content-Type: application/json" \
  -d '{
    "databaseId": "abc123-def456-ghi789",
    "notionToken": "secret_1234567890abcdef",
    "xProperty": "Name",
    "yProperty": "Amount",
    "chartType": "bar",
    "aggregateFunction": "SUM",
    "title": "動態銷售統計圖",
    "snapshotMode": "dynamic",
    "isDemo": false
  }'
```

**成功回應** (201):

```json
{
  "id": "query_1753784442310_240887d1",
  "message": "Query snapshot saved successfully",
  "timestamp": 1753784442310,
  "snapshotMode": "dynamic"
}
```

### 2. 執行動態查詢快照

**端點**: `GET /api/snapshots/query/:id`

**描述**: 執行動態查詢快照，根據快照模式回傳資料

**路徑參數**:

- `id`: 動態快照 ID

**請求範例**:

```bash
curl -X GET http://localhost:3001/api/snapshots/query/query_1753784442310_240887d1
```

**成功回應** (200):

```json
{
  "id": "query_1753784442310_240887d1",
  "data": [
    {
      "x": "產品A",
      "y": 1250,
      "label": "產品A",
      "aggregateFunction": "SUM",
      "originalCount": 15,
      "valueCount": 15
    },
    {
      "x": "產品B",
      "y": 980,
      "label": "產品B",
      "aggregateFunction": "SUM",
      "originalCount": 12,
      "valueCount": 12
    }
  ],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "動態銷售統計圖",
  "isDemo": false,
  "timestamp": 1753784500000,
  "createdAt": "2024-01-01T10:30:00.000Z"
}
```

### 3. 取得動態查詢快照設定

**端點**: `GET /api/snapshots/query/:id/config`

**描述**: 取得動態快照的設定資訊（不包含敏感資料）

**路徑參數**:

- `id`: 動態快照 ID

**請求範例**:

```bash
curl -X GET http://localhost:3001/api/snapshots/query/query_1753784442310_240887d1/config
```

**成功回應** (200):

```json
{
  "id": "query_1753784442310_240887d1",
  "databaseId": "abc123-def456-ghi789",
  "xProperty": "Name",
  "yProperty": "Amount",
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "動態銷售統計圖",
  "snapshotMode": "dynamic",
  "cacheExpireMinutes": 60,
  "isDemo": false,
  "timestamp": 1753784442310,
  "createdAt": "2024-01-01T10:25:42.310Z",
  "lastUpdated": "2024-01-01T10:30:00.000Z"
}
```

**快照模式說明**:

- `static`: 靜態快照，資料固定不變
- `dynamic`: 動態快照，每次查詢都從 Notion API 取得最新資料
- `cached`: 快取快照，定時更新資料快取

---

## 🔍 搜尋功能 API

### 搜尋資料庫

**端點**: `POST /api/notion/search`

**描述**: 在 Notion 工作區中搜尋資料庫

**請求格式**:

```json
{
  "token": "secret_xxx",
  "query": "搜尋關鍵字"
}
```

**成功回應** (200):

```json
{
  "results": [
    {
      "id": "database-uuid",
      "title": "符合的資料庫名稱",
      "object": "database"
    }
  ]
}
```

**注意**: 此端點目前在 NestJS 後端中尚未實現，可在未來版本中添加。

---

## 📊 資料處理功能

### 聚合函數說明

API 支援以下資料聚合函數：

| 函數      | 說明   | 適用資料類型 | 範例                             |
| --------- | ------ | ------------ | -------------------------------- |
| **SUM**   | 加總   | 數字         | 將相同 X 軸 值的 Y 軸 數值相加   |
| **AVG**   | 平均值 | 數字         | 計算相同 X 軸 值的平均 Y 軸 數值 |
| **MIN**   | 最小值 | 數字         | 找出相同 X 軸 值的最小 Y 軸 數值 |
| **MAX**   | 最大值 | 數字         | 找出相同 X 軸 值的最大 Y 軸 數值 |
| **COUNT** | 計數   | 任何類型     | 計算相同 X 軸 值出現的次數       |

### 資料轉換規則

#### Notion 屬性類型對應

| Notion 類型  | JavaScript 類型 | 處理方式      | 範例               |
| ------------ | --------------- | ------------- | ------------------ |
| title        | string          | 取 plain_text | "產品名稱"         |
| rich_text    | string          | 取 plain_text | "描述文字"         |
| number       | number          | 直接使用      | 15000              |
| select       | string          | 取 name       | "類別 A"           |
| multi_select | string          | 合併 name     | "標籤 1, 標籤 2"   |
| date         | string          | 取 start      | "2025-07-29"       |
| checkbox     | boolean         | 直接使用      | true/false         |
| url          | string          | 直接使用      | "https://..."      |
| email        | string          | 直接使用      | "user@example.com" |
| phone_number | string          | 直接使用      | "+886-123-456-789" |

---

## 🚨 錯誤處理

### 標準錯誤格式

所有 API 錯誤都使用 NestJS 標準的錯誤格式：

```json
{
  "statusCode": 400,
  "message": "錯誤描述",
  "error": "Bad Request"
}
```

### 常見錯誤代碼

| HTTP 狀態 | 錯誤類型              | 說明                   | 範例回應                                                                                         |
| --------- | --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| 400       | BadRequestException   | 請求參數錯誤或格式無效 | `{"statusCode": 400, "message": "token should not be empty", "error": "Bad Request"}`            |
| 401       | UnauthorizedException | Token 無效或權限不足   | `{"statusCode": 401, "message": "Unauthorized - Invalid Notion token", "error": "Unauthorized"}` |
| 404       | NotFoundException     | 資源不存在             | `{"statusCode": 404, "message": "Snapshot not found", "error": "Not Found"}`                     |
| 500       | InternalServerError   | 伺服器內部錯誤         | `{"statusCode": 500, "message": "Internal server error", "error": "Internal Server Error"}`      |

### 輸入驗證

NestJS 使用 `class-validator` 進行自動輸入驗證：

- **NotionTokenDto**: 驗證 token 字段不能為空
- **DatabasePropertiesDto**: 驗證 token 和 databaseId 字段
- **QueryDatabaseDto**: 驗證必需字段和可選字段類型
- **CreateSnapshotDto**: 驗證圖表資料結構

### 錯誤處理範例

```javascript
try {
  const response = await fetch("/api/notion/databases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: "secret_xxx" }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("API Error:", error);

    switch (error.statusCode) {
      case 400:
        alert("請求參數錯誤，請檢查輸入格式");
        break;
      case 401:
        alert("Token 無效，請重新設定 Notion Integration Token");
        break;
      case 404:
        alert("找不到指定的資源");
        break;
      case 500:
        alert("伺服器內部錯誤，請稍後再試");
        break;
      default:
        alert(`錯誤: ${error.message}`);
    }
    return;
  }

  const data = await response.json();
  console.log("Success:", data);
} catch (error) {
  console.error("Network Error:", error);
  alert("網路連線錯誤，請稍後再試");
}
```

---

## 🔧 開發者工具

### 測試 API

您可以使用以下工具測試 API：

1. **Curl**: 命令列工具
2. **Postman**: GUI 介面
3. **Insomnia**: 輕量級 API 客戶端
4. **VS Code REST Client**: 編輯器插件
5. **Thunder Client**: VS Code 擴展

### 環境設定

在開發環境中，您可以設定以下環境變數：

**前端 (.env.local)**:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**後端 (.env)**:

```env
PORT=3001
NODE_ENV=development
NOTION_API_VERSION=2022-06-28
SNAPSHOT_RETENTION_DAYS=7
```

### API 速率限制

- **Notion API**: 遵循 Notion 官方限制（約 3 請求/秒）
- **快照 API**: 無特殊限制
- **建議**: 在生產環境中使用 NestJS 的 Throttler 模組實施速率限制

### 開發命令

```bash
# 安裝所有依賴
npm run install:all

# 啟動開發服務器 (前端 + 後端)
npm run dev

# 僅啟動前端
npm run dev:frontend

# 僅啟動後端
npm run dev:backend

# 建構專案
npm run build

# 啟動生產服務器
npm run start
```

---

## 📖 更多資源

- [Notion API 官方文件](https://developers.notion.com/reference)
- [NestJS 文件](https://docs.nestjs.com/)
- [Next.js 文件](https://nextjs.org/docs)
- [Apache ECharts 文件](https://echarts.apache.org/zh/index.html)
- [Zustand 文件](https://zustand-demo.pmnd.rs/)
- [TailwindCSS 文件](https://tailwindcss.com/docs)
- [Shadcn UI 文件](https://ui.shadcn.com/)

## 🎯 API 使用建議

### 最佳實踐

1. **Token 安全**:

   - 不要在前端代碼中硬編碼 Token
   - 使用環境變數或安全的儲存方式

2. **錯誤處理**:

   - 總是檢查 HTTP 狀態碼
   - 提供使用者友善的錯誤訊息
   - 實作重試機制

3. **效能優化**:

   - 使用適當的 pageSize 避免單次查詢過多資料
   - 實作前端快取以減少重複請求
   - 使用 startCursor 進行分頁查詢

4. **資料驗證**:
   - 後端已實作自動驗證，前端也應進行基本檢查
   - 確保數字類型的屬性用於 Y 軸
   - 檢查必要欄位的存在

### 常見問題解答

**Q: 為什麼要使用 POST 方法傳送 Token？**
A: 為了安全性考量，避免 Token 在 URL 中暴露，所有包含敏感資訊的請求都使用 POST 方法並在 Body 中傳送。

**Q: 快照的保存期限是多久？**
A: 預設為 7 天，可透過 cleanup API 的 days 參數調整，或在環境變數中設定 SNAPSHOT_RETENTION_DAYS。

**Q: 支援哪些 Notion 屬性類型？**
A: 目前支援 title、rich_text、number、select、multi_select、date、checkbox、url、email、phone_number 等類型。

---

**文件版本**: v2.0.0  
**最後更新**: 2025 年 7 月 29 日  
**維護者**: Development Team
