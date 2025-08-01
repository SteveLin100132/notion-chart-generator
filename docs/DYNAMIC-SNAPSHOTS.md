# 動態快照系統

## 概述

動態快照系統是 Notion Chart Generator 的核心功能，提供即時資料同步解決方案。與傳統靜態快照不同，動態快照儲存查詢參數而非靜態資料，確保每次載入都能獲取 Notion 資料庫的最新內容。

## 系統特點

### 即時資料同步

- **即時更新**: 每次檢視都會從 Notion API 取得最新資料
- **資料一致性**: 圖表始終反映資料庫的當前狀態
- **自動同步**: 無需手動重新生成快照

### 安全性保障

- **Token 加密**: 使用 AES-256-CBC 加密儲存 API Token
- **隱私保護**: 僅儲存查詢參數，不儲存實際資料
- **隨機 ID**: 使用時間戳和 UUID 生成唯一快照 ID

### 分享便利性

- **永久連結**: 分享連結始終顯示最新資料
- **嵌入支援**: 支援 iframe 嵌入外部網站
- **跨平台相容**: 響應式設計，支援各種設備

## 技術架構

### 後端架構

```
SnapshotService
└── Query Snapshots (動態查詢參數)
    ├── 加密的 API Token 儲存
    ├── 查詢參數儲存
    └── 即時資料查詢
```

### 資料流程

#### 動態快照流程

```
用戶請求 → 儲存查詢參數 → 生成快照 ID → 回傳成功訊息
                ↓
載入快照 → 讀取查詢參數 → 解密 Token → 即時查詢 Notion API → 處理資料 → 回傳結果
```

## API 端點

### 建立動態快照

```http
POST /api/snapshots/query
Content-Type: application/json

{
  "databaseId": "notion-database-id",
  "notionToken": "secret_xxx",
  "xProperty": "name",
  "yProperty": "value",
  "chartType": "bar",
  "aggregateFunction": "sum",
  "title": "動態銷售統計圖",
  "snapshotMode": "dynamic"
}
```

### 執行動態查詢

```http
GET /api/snapshots/query/{id}
```

### 取得快照設定

```http
GET /api/snapshots/query/{id}/config
```

## 安全性

### Token 加密

- 使用 AES-256-CBC 演算法加密 Notion API Token
- 加密密鑰從環境變數 `ENCRYPTION_KEY` 取得
- 生產環境請務必設定強度足夠的加密密鑰

### 環境變數設定

```bash
# .env
ENCRYPTION_KEY=your-strong-secret-key-here-min-32-chars
```

## 使用方式

### 前端整合

1. **快照模式選擇**

```tsx
<Select value={snapshotMode} onValueChange={setSnapshotMode}>
  <SelectItem value="static">靜態快照</SelectItem>
  <SelectItem value="dynamic">動態快照</SelectItem>
  <SelectItem value="cached">快取快照</SelectItem>
</Select>
```

2. **建立動態快照**

```typescript
const response = await snapshotApi.saveQuerySnapshot({
  databaseId: selectedDatabase,
  notionToken: token,
  xProperty: xAxisProperty,
  yProperty: yAxisProperty,
  chartType: chartType,
  aggregateFunction: aggregateFunction,
  title: chartTitle,
  snapshotMode: "dynamic",
});
```

3. **執行動態快照**

```typescript
const snapshot = await snapshotApi.executeQuerySnapshot(queryId);
// snapshot.data 包含圖表資料
// snapshot.rawData 包含完整的資料庫資料
```

## 效能考量

### 建議設定

| 使用場景     | 載入時間 | 說明               |
| ------------ | -------- | ------------------ | ---------------- |
| 實時監控     | Dynamic  | -                  | 資料即時性最重要 |
| 即時監控面板 | 1-3 秒   | 始終顯示最新資料   |
| 業務報表     | 1-3 秒   | 每次檢視都是最新   |
| 歷史分析     | 1-3 秒   | 資料即時性最重要   |
| 公開展示     | 1-3 秒   | 分享的資料始終最新 |

### 效能最佳化

- 動態快照確保資料始終為最新
- 分頁查詢支援大型資料庫
- 網路請求優化減少載入時間
- Token 加密儲存保障安全性

## 錯誤處理

### 容錯機制

動態快照系統提供完善的錯誤處理：

```typescript
try {
  // 執行動態快照查詢
  const snapshot = await snapshotApi.executeQuerySnapshot(queryId);
} catch (error) {
  console.error("動態快照載入失敗:", error);
  // 顯示錯誤訊息給用戶
  setError("無法載入最新資料，請檢查網路連線或稍後再試");
}
```

### 常見錯誤

- **Token 解密失敗**: 檢查 `ENCRYPTION_KEY` 環境變數
- **Notion API 請求失敗**: 檢查 Token 權限和資料庫存取權限
- **快照檔案讀取失敗**: 檢查檔案系統權限和儲存空間
- **網路連線問題**: 確保伺服器可以存取 Notion API

## 分享功能

### 分享連結格式

動態快照的分享連結使用查詢參數格式：

```
https://your-domain.com/?query=query_1753784442310_240887d1&embed=true
```

### iframe 嵌入

```html
<iframe
  src="https://your-domain.com/?query=query_1753784442310_240887d1&embed=true"
  width="800"
  height="600"
  frameborder="0"
>
</iframe>
```

## 未來功能

### 已實現功能

- [x] 動態快照核心功能
- [x] Token 加密儲存
- [x] 分享功能整合
- [x] 錯誤處理機制
- [x] 即時資料同步

### 可能的擴展

- Webhook 支援即時更新通知
- 多資料來源整合 (除了 Notion 之外)
- 分散式快取支援
- 快照使用統計和分析

## 故障排除

### 常見問題

1. **動態快照建立失敗**

   - 檢查 Notion Token 是否有效
   - 確認資料庫 ID 正確
   - 驗證環境變數設定

2. **快取未更新**

   - 檢查快取過期時間設定
   - 手動刪除快照檔案強制更新
   - 確認系統時間正確

3. **加密錯誤**
   - 設定 `ENCRYPTION_KEY` 環境變數
   - 確保密鑰長度足夠 (建議 32 字元以上)
   - 重新啟動應用程式套用新密鑰

### 除錯建議

- 開啟詳細日誌記錄
- 使用 API 端點測試工具驗證後端功能
- 檢查瀏覽器開發者工具的網路請求
- 查看後端伺服器日誌輸出
