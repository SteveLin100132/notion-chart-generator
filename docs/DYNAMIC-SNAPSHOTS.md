# 動態快照系統

## 概述

動態快照系統是 Notion Chart Generator 的核心功能之一，解決了傳統靜態快照無法即時反映 Notion 資料庫更新的問題。系統提供三種快照模式，讓使用者可以根據需求選擇最適合的資料同步策略。

## 快照模式

### 1. 靜態快照 (Static)

- **特點**: 將當前資料庫資料儲存為靜態檔案
- **優點**: 載入速度快，不依賴外部 API，資料穩定
- **缺點**: 資料不會自動更新，需要手動重新生成
- **適用場景**: 報告製作、資料歸檔、網路不穩定環境

### 2. 動態快照 (Dynamic)

- **特點**: 每次檢視都會從 Notion API 取得最新資料
- **優點**: 資料始終為最新，即時反映資料庫變更
- **缺點**: 載入時間較長，依賴網路連線，API 請求次數較多
- **適用場景**: 即時監控面板、實時報表、重要資料追蹤

### 3. 快取快照 (Cached)

- **特點**: 定時從 Notion API 更新資料快取
- **優點**: 平衡效能與即時性，可自訂快取過期時間
- **缺點**: 資料可能有延遲，需要額外的快取管理
- **適用場景**: 一般業務報表、定期更新的儀表板

## 技術架構

### 後端架構

```
SnapshotService
├── Static Snapshots (傳統靜態檔案)
└── Query Snapshots (動態查詢參數)
    ├── 加密的 API Token 儲存
    ├── 查詢參數儲存
    └── 快取機制
```

### 資料流程

#### 靜態模式

```
用戶請求 → 查詢 Notion API → 處理資料 → 儲存快照檔案 → 回傳結果
```

#### 動態模式

```
用戶請求 → 儲存查詢參數 → 即時查詢 Notion API → 處理資料 → 回傳結果
```

#### 快取模式

```
用戶請求 → 檢查快取 → [過期] 查詢 Notion API → 更新快取 → 回傳結果
         └── [未過期] 直接回傳快取資料
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
  "snapshotMode": "dynamic",
  "cacheExpireMinutes": 60
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

2. **快取時間設定** (僅快取模式)

```tsx
<Input
  type="number"
  value={cacheExpireMinutes}
  onChange={(e) => setCacheExpireMinutes(parseInt(e.target.value))}
/>
```

3. **建立動態快照**

```typescript
const response = await snapshotApi.saveQuerySnapshot({
  databaseId: selectedDatabase,
  notionToken: token,
  xProperty: xAxisProperty,
  yProperty: yAxisProperty,
  chartType: chartType,
  aggregateFunction: aggregateFunction,
  title: chartTitle,
  snapshotMode: snapshotMode,
  cacheExpireMinutes: cacheExpireMinutes,
});
```

## 效能考量

### 建議設定

| 使用場景 | 建議模式 | 快取時間     | 說明             |
| -------- | -------- | ------------ | ---------------- |
| 實時監控 | Dynamic  | -            | 資料即時性最重要 |
| 業務報表 | Cached   | 15-60 分鐘   | 平衡效能與即時性 |
| 歷史分析 | Static   | -            | 資料穩定性最重要 |
| 公開展示 | Cached   | 60-1440 分鐘 | 減少 API 使用量  |

### 效能最佳化

- 快取模式可大幅減少 Notion API 請求次數
- 合適的快取時間設定可平衡效能與資料新鮮度
- 靜態模式適合不常變動的資料或網路受限環境

## 錯誤處理

### 自動回退機制

當動態快照失敗時，系統會自動回退到靜態模式：

```typescript
try {
  // 嘗試建立動態快照
  await generateDynamicChart();
} catch (error) {
  // 回退到靜態模式
  console.log("回退到靜態模式...");
  await generateStaticChart();
}
```

### 常見錯誤

- **Token 加密失敗**: 檢查 `ENCRYPTION_KEY` 環境變數
- **Notion API 請求失敗**: 檢查 Token 權限和資料庫存取權限
- **快照檔案讀取失敗**: 檢查檔案系統權限和儲存空間

## 未來功能

### 計劃中的功能

- [ ] Notion API 整合實作
- [ ] 進階快取策略 (LRU, TTL)
- [ ] 批量快照操作
- [ ] 快照分析和使用統計
- [ ] 自動快取清理機制

### 可能的擴展

- Webhook 支援即時更新
- 多資料來源整合 (除了 Notion 之外)
- 分散式快取支援
- 快照版本控制

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
