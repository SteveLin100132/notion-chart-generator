# 開發指南

## 🚀 快速啟動

### 1. 安裝依賴

使用提供的腳本自動安裝所有依賴：

**Windows:**

```cmd
install.bat
```

**macOS/Linux:**

```bash
chmod +x install.sh
./install.sh
```

**手動安裝:**

```bash
npm run install:all
```

### 2. 啟動開發服務器

```bash
npm run dev
```

這將同時啟動：

- 前端開發服務器 (http://localhost:3000)
- 後端 API 服務器 (http://localhost:3001)

### 3. 開始開發

1. 瀏覽器開啟 http://localhost:3000
2. 輸入您的 Notion Integration Token
3. 開始使用圖表生成功能

## 📁 專案架構

```
notion-chart-generator/
├── frontend/          # Next.js + React 前端
├── backend/           # NestJS 後端 API
├── docs/             # 專案文件
└── 配置檔案
```

## 🛠️ 開發命令

### 根目錄命令

```bash
npm run dev           # 啟動前後端開發服務器
npm run build         # 建構整個專案
npm run start         # 啟動生產版本
npm run install:all   # 安裝所有依賴
```

### 前端開發

```bash
cd frontend
npm run dev          # 開發模式
npm run build        # 建構
npm run start        # 生產模式
npm run lint         # 程式碼檢查
```

### 後端開發

```bash
cd backend
npm run start:dev    # 開發模式（自動重啟）
npm run build        # 建構
npm run start:prod   # 生產模式
npm run test         # 測試
```

## 🎯 主要功能實現

### 狀態管理 (Zustand)

- 全局狀態管理
- Notion 連接狀態
- 圖表設定和資料

### API 整合

- Notion API 代理
- 資料處理和轉換
- 快照管理

### UI 組件

- Shadcn UI 組件系統
- 響應式設計
- 黑灰白主題

### 圖表渲染

- Apache ECharts 整合
- 多種圖表類型
- 自訂樣式和動畫

## 🔧 技術細節

### 前端技術棧

- React 18+ with TypeScript
- Next.js 14 with App Router
- TailwindCSS + Shadcn UI
- Zustand for state management
- Apache ECharts for charts
- Axios for API calls

### 後端技術棧

- NestJS 10+ with TypeScript
- Express.js
- Class Validator for validation
- File-based snapshot storage
- CORS enabled

## 📝 開發注意事項

1. **TypeScript**: 整個專案使用 TypeScript 開發
2. **Lint errors**: 目前的 lint errors 主要是因為依賴尚未安裝
3. **環境變數**: 後端使用 .env 文件配置
4. **CORS**: 已配置允許前端存取後端 API
5. **檔案結構**: 遵循 Next.js 和 NestJS 最佳實踐

## 🚧 下一步開發

1. 安裝依賴並解決 TypeScript 錯誤
2. 測試 Notion API 整合
3. 完善圖表樣式和互動
4. 添加更多圖表類型
5. 優化效能和錯誤處理
6. 添加測試用例

## � 動態快照系統開發

### 環境設定

在後端 `.env` 檔案中添加加密密鑰：

```bash
# 加密配置
ENCRYPTION_KEY=your-strong-secret-key-here-min-32-chars
```

### 開發重點

1. **Token 安全性**

   - Notion API Token 使用 AES-256-CBC 加密
   - 生產環境務必設定強度足夠的 `ENCRYPTION_KEY`

2. **快照模式**

   - `static`: 傳統靜態快照
   - `dynamic`: 即時查詢 Notion API
   - `cached`: 快取機制平衡效能與即時性

3. **錯誤處理**
   - 動態快照失敗時自動回退到靜態模式
   - 完整的錯誤日誌記錄

### API 開發

新增的 API 端點：

- `POST /api/snapshots/query` - 建立動態快照
- `GET /api/snapshots/query/:id` - 執行動態查詢
- `GET /api/snapshots/query/:id/config` - 取得快照設定

### 前端整合

動態快照相關的前端組件：

- 快照模式選擇器
- 快取時間設定
- 自動回退機制

### 待實作功能

- [ ] Notion API 實際整合
- [ ] 進階快取策略
- [ ] 批量快照操作
- [ ] 快照使用統計

詳細說明請參考 `docs/DYNAMIC-SNAPSHOTS.md`

## �📞 技術支援

如果遇到問題，請檢查：

1. Node.js 版本 (需要 18+)
2. 依賴是否正確安裝
3. 環境變數是否設定
4. Notion Token 是否有效
5. 動態快照系統的加密密鑰設定
