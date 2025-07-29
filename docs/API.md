# API 參考文件

本文件詳細說明了 Notion ECharts 視覺化工具的所有 API 端點。

## 🌐 基本資訊

- **基礎 URL**: `http://localhost:3000`
- **API 版本**: v2.0.0
- **Content-Type**: `application/json`
- **Notion API 版本**: `2022-06-28`

---

## 📡 Notion API 代理端點

所有 Notion API 請求都透過伺服器代理處理，以解決 CORS 問題並提供統一的錯誤處理。

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
curl -X POST http://localhost:3000/api/notion/databases \
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
curl -X POST http://localhost:3000/api/notion/database-properties \
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
  "filter": {} // 可選的過濾條件
}
```

**請求範例**:

```bash
curl -X POST http://localhost:3000/api/notion/query \
  -H "Content-Type: application/json" \
  -d '{
    "token": "secret_1234567890abcdef",
    "databaseId": "a8aec433-84f4-47ed-8439-0e8e42c2e089",
    "filter": {
      "property": "區域",
      "select": {
        "equals": "台北"
      }
    }
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
]
```

---

## 💾 快照管理 API

快照系統用於保存和分享圖表配置及資料。

### 1. 保存快照

**端點**: `POST /api/snapshots`

**描述**: 保存圖表的快照資料

**請求格式**:

```json
{
  "data": [...], // 圖表資料陣列
  "chartType": "bar|line|pie|scatter",
  "aggregateFunction": "SUM|AVG|MIN|MAX|COUNT",
  "title": "圖表標題",
  "isDemo": false
}
```

**請求範例**:

```bash
curl -X POST http://localhost:3000/api/snapshots \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {"x": "產品A", "y": 15000, "label": "產品A"},
      {"x": "產品B", "y": 12000, "label": "產品B"}
    ],
    "chartType": "bar",
    "aggregateFunction": "SUM",
    "title": "產品銷售統計",
    "isDemo": false
  }'
```

**成功回應** (201):

```json
{
  "id": "chart_1690000000000_abc123",
  "message": "Snapshot saved successfully",
  "timestamp": 1690000000000
}
```

### 2. 讀取快照

**端點**: `GET /api/snapshots/{id}`

**描述**: 根據 ID 讀取快照資料

**請求範例**:

```bash
curl -X GET http://localhost:3000/api/snapshots/chart_1690000000000_abc123
```

**成功回應** (200):

```json
{
  "id": "chart_1690000000000_abc123",
  "data": [
    {
      "x": "產品A",
      "y": 15000,
      "label": "產品A",
      "aggregateFunction": "SUM",
      "originalCount": 5,
      "valueCount": 5
    }
  ],
  "chartType": "bar",
  "aggregateFunction": "SUM",
  "title": "產品銷售統計",
  "isDemo": false,
  "timestamp": 1690000000000,
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

**錯誤回應** (404):

```json
{
  "error": "Snapshot not found",
  "code": "SNAPSHOT_NOT_FOUND"
}
```

### 3. 清理過期快照

**端點**: `DELETE /api/snapshots/cleanup`

**描述**: 清理超過指定天數的快照檔案

**查詢參數**:

- `days`: 保留天數，預設為 7 天

**請求範例**:

```bash
curl -X DELETE "http://localhost:3000/api/snapshots/cleanup?days=7"
```

**成功回應** (200):

```json
{
  "message": "Cleanup completed",
  "deletedCount": 15,
  "errorCount": 0,
  "retentionDays": 7
}
```

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

所有 API 錯誤都使用統一的格式：

```json
{
  "error": "錯誤描述",
  "code": "ERROR_CODE",
  "details": "詳細錯誤資訊（可選）"
}
```

### 常見錯誤代碼

| 代碼                 | HTTP 狀態 | 說明                     |
| -------------------- | --------- | ------------------------ |
| `INVALID_TOKEN`      | 400       | Token 格式無效           |
| `UNAUTHORIZED`       | 401       | Token 無效或權限不足     |
| `DATABASE_NOT_FOUND` | 404       | 資料庫不存在或無權限存取 |
| `SNAPSHOT_NOT_FOUND` | 404       | 快照不存在               |
| `INVALID_REQUEST`    | 400       | 請求格式錯誤             |
| `INTERNAL_ERROR`     | 500       | 伺服器內部錯誤           |
| `NOTION_API_ERROR`   | 502       | Notion API 錯誤          |

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

    switch (error.code) {
      case "INVALID_TOKEN":
        alert("請檢查您的 Notion Token 格式");
        break;
      case "UNAUTHORIZED":
        alert("Token 無效，請重新設定");
        break;
      default:
        alert(`錯誤: ${error.error}`);
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

### 環境設定

在開發環境中，您可以設定以下環境變數：

```env
PORT=3000
NODE_ENV=development
NOTION_API_VERSION=2022-06-28
SNAPSHOT_RETENTION_DAYS=7
DEBUG=true
```

### API 速率限制

- **Notion API**: 遵循 Notion 官方限制（約 3 請求/秒）
- **快照 API**: 無特殊限制
- **建議**: 在生產環境中實施適當的速率限制

---

## 📖 更多資源

- [Notion API 官方文件](https://developers.notion.com/reference)
- [ECharts 文件](https://echarts.apache.org/zh/index.html)
- [Express.js 文件](https://expressjs.com/)
- [專案 GitHub](https://github.com/your-repo/notion-echart)

---

**文件版本**: v2.0.0  
**最後更新**: 2025 年 7 月 29 日  
**維護者**: Development Team
