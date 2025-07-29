# Notion ECharts 視覺化工具 🚀

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/your-repo/notion-echart)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-e0234e.svg)](https://nestjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一個現代化的 Web 應用程式，能夠連接 Notion 資料庫並將資料轉換為美觀的互動式圖表。支援多種圖表類型、資料聚合計算、即時分享和跨平台嵌入功能。

## 🏗️ 技術棧

### 前端

- **React.js 18+** - 現代化的 UI 框架
- **Next.js 14+** - 全棧 React 框架，支援 App Router
- **TailwindCSS** - 原子化 CSS 框架
- **Shadcn UI** - 現代化的 UI 組件庫
- **Apache ECharts** - 專業圖表渲染引擎
- **Zustand** - 輕量級狀態管理
- **TypeScript** - 型別安全

### 後端

- **NestJS 10+** - 企業級 Node.js 框架
- **TypeScript** - 型別安全的開發體驗
- **Class Validator** - 資料驗證
- **Axios** - HTTP 客戶端

## ✨ 主要功能

### 🎯 核心功能

- **🔗 Notion API 整合**: 直接連接到您的 Notion 資料庫
- **📊 多種圖表類型**: 長條圖、線圖、圓餅圖、散佈圖
- **🧮 資料聚合**: 支援 SUM、AVG、MIN、MAX、COUNT 等聚合計算
- **📱 響應式設計**: 完美適配桌面、平板和手機
- **⚡ 即時互動**: 懸停、縮放、探索您的資料

### 🚀 進階功能

- **🔗 分享功能**: 生成分享連結，支援跨平台存取
- **📋 iframe 嵌入**: 輕鬆嵌入到其他應用程式
- **💾 快照系統**: 後端快照儲存，確保分享連結永久有效
- **🎛️ 動態選擇**: 自動載入資料庫列表和屬性選擇
- **🎨 美觀介面**: 現代化 UI 設計，優秀的用戶體驗

## 🚀 快速開始

### 系統需求

- **Node.js**: 18.0.0 或更高版本
- **npm**: 9.0.0 或更高版本
- **瀏覽器**: Chrome 90+、Firefox 88+、Safari 14+、Edge 90+

### 1. 克隆專案

```bash
git clone <repository-url>
cd notion-chart-generator
```

### 2. 安裝依賴

#### Windows (使用批次檔)

```bash
install.bat
```

#### macOS/Linux (使用 Shell 腳本)

```bash
chmod +x install.sh
./install.sh
```

#### 手動安裝

```bash
# 安裝根目錄依賴
npm install

# 安裝前端依賴
cd frontend
npm install

# 安裝後端依賴
cd ../backend
npm install
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

瀏覽器導航至 `http://localhost:3000`

## 📊 專案結構

```
notion-chart-generator/
├── 📁 frontend/                # Next.js 前端應用
│   ├── 📁 src/
│   │   ├── 📁 app/             # App Router 頁面
│   │   ├── 📁 components/      # React 組件
│   │   │   ├── 📁 ui/          # Shadcn UI 組件
│   │   │   ├── chart-renderer.tsx
│   │   │   ├── settings-panel.tsx
│   │   │   └── share-modal.tsx
│   │   └── 📁 lib/             # 工具函數和狀態管理
│   │       ├── store.ts        # Zustand 狀態管理
│   │       ├── api.ts          # API 客戶端
│   │       └── utils.ts        # 工具函數
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── 📁 backend/                 # NestJS 後端 API
│   ├── 📁 src/
│   │   ├── 📁 notion/          # Notion API 模組
│   │   │   ├── dto/
│   │   │   ├── notion.controller.ts
│   │   │   ├── notion.service.ts
│   │   │   └── notion.module.ts
│   │   ├── 📁 snapshot/        # 快照管理模組
│   │   │   ├── dto/
│   │   │   ├── snapshot.controller.ts
│   │   │   ├── snapshot.service.ts
│   │   │   └── snapshot.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── 📁 snapshots/           # 快照檔案儲存
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── 📁 docs/                    # 專案文件
│   ├── SPECS.md               # 技術規格文件
│   └── API.md                 # API 文件
│
├── package.json               # 根目錄配置
├── install.bat               # Windows 安裝腳本
├── install.sh                # macOS/Linux 安裝腳本
└── README.md                 # 本文件
```

## 🔧 開發指南

### 開發腳本

```bash
# 開發模式 (同時啟動前後端)
npm run dev

# 僅前端開發
npm run dev:frontend

# 僅後端開發
npm run dev:backend

# 建構專案
npm run build

# 生產模式啟動
npm run start
```

### 前端開發

```bash
cd frontend

# 啟動開發服務器
npm run dev

# 建構生產版本
npm run build

# 啟動生產服務器
npm run start

# 程式碼檢查
npm run lint
```

### 後端開發

```bash
cd backend

# 啟動開發服務器 (自動重啟)
npm run start:dev

# 建構生產版本
npm run build

# 啟動生產服務器
npm run start:prod

# 程式碼檢查
npm run lint

# 運行測試
npm run test
```

## 📊 圖表類型詳解

| 圖表類型      | 適用場景           | X 軸需求  | Y 軸需求 | 聚合功能    |
| ------------- | ------------------ | --------- | -------- | ----------- |
| 📊 **長條圖** | 類別比較、數量統計 | 文字/分類 | 數字     | ✅ 全支援   |
| 📈 **線圖**   | 趨勢分析、時間序列 | 文字/日期 | 數字     | ✅ 全支援   |
| 🥧 **圓餅圖** | 比例分析、百分比   | 標籤      | 數字     | ✅ 計數統計 |
| ⚪ **散佈圖** | 相關性分析、雙變數 | 數字      | 數字     | ✅ 聚合顯示 |

### 聚合函數說明

- **SUM (加總)** 📊: 將相同 X 軸 值的所有 Y 軸 數值相加
- **AVG (平均值)** 📈: 計算相同 X 軸 值的 Y 軸 數值平均
- **MIN (最小值)** 📉: 找出相同 X 軸 值中的最小 Y 軸 數值
- **MAX (最大值)** 📈: 找出相同 X 軸 值中的最大 Y 軸 數值
- **COUNT (計數)** 🔢: 計算相同 X 軸 值出現的次數

## 🔗 API 端點

### Notion API 代理

| 端點                              | 方法 | 描述           |
| --------------------------------- | ---- | -------------- |
| `/api/notion/databases`           | POST | 獲取資料庫列表 |
| `/api/notion/database-properties` | POST | 獲取資料庫屬性 |
| `/api/notion/query`               | POST | 查詢資料庫資料 |

### 快照管理 API

| 端點                     | 方法   | 描述         |
| ------------------------ | ------ | ------------ |
| `/api/snapshots`         | POST   | 保存快照     |
| `/api/snapshots/:id`     | GET    | 獲取快照     |
| `/api/snapshots/cleanup` | DELETE | 清理過期快照 |

詳細的 API 文件請參考 [API.md](docs/API.md)

## 🔒 Notion 設定

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

## 🎨 UI 設計特色

- **黑灰白色調**: 專業的商務風格
- **現代化介面**: 簡潔直觀的操作體驗
- **響應式佈局**: 適配各種螢幕尺寸
- **優雅動畫**: 流暢的互動效果
- **無障礙設計**: 符合 WCAG 標準

## 🚀 部署指南

### 前端部署 (Vercel)

```bash
cd frontend
npm run build
# 部署到 Vercel 或其他平台
```

### 後端部署 (Railway/Heroku)

```bash
cd backend
npm run build
# 設定環境變數並部署
```

### Docker 部署

```dockerfile
# 多階段構建範例
FROM node:18-alpine AS builder
# ... 建構步驟
```

## 🧪 測試

```bash
# 後端測試
cd backend
npm run test

# 前端測試
cd frontend
npm run test
```

## 🤝 貢獻指南

### 如何貢獻

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

### 開發規範

- 使用 TypeScript 進行開發
- 遵循 ESLint 和 Prettier 規範
- 撰寫必要的測試用例
- 更新相關文件

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🏆 致謝

感謝以下專案和社群：

- [Notion](https://notion.so) - 提供強大的 API
- [Apache ECharts](https://echarts.apache.org/) - 優秀的圖表庫
- [React](https://reactjs.org/) - 現代化的 UI 框架
- [Next.js](https://nextjs.org/) - 全棧 React 框架
- [NestJS](https://nestjs.com/) - 企業級 Node.js 框架
- [TailwindCSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Shadcn UI](https://ui.shadcn.com/) - 精美的 UI 組件
- 所有貢獻者和使用者的回饋

---

**版本**: v2.0.0  
**最後更新**: 2025 年 7 月 29 日  
**開發者**: Development Team  
**支援**: [GitHub Issues](https://github.com/your-repo/notion-echart/issues)

## 📊 圖表類型詳解

| 圖表類型      | 適用場景           | X 軸需求  | Y 軸需求 | 聚合功能    |
| ------------- | ------------------ | --------- | -------- | ----------- |
| 📊 **長條圖** | 類別比較、數量統計 | 文字/分類 | 數字     | ✅ 全支援   |
| 📈 **線圖**   | 趨勢分析、時間序列 | 文字/日期 | 數字     | ✅ 全支援   |
| 🥧 **圓餅圖** | 比例分析、百分比   | 標籤      | 數字     | ✅ 計數統計 |
| ⚪ **散佈圖** | 相關性分析、雙變數 | 數字      | 數字     | ✅ 聚合顯示 |

### 聚合函數說明

- **SUM (加總)** 📊: 將相同 X 軸 值的所有 Y 軸 數值相加
- **AVG (平均值)** 📈: 計算相同 X 軸 值的 Y 軸 數值平均
- **MIN (最小值)** 📉: 找出相同 X 軸 值中的最小 Y 軸 數值
- **MAX (最大值)** 📈: 找出相同 X 軸 值中的最大 Y 軸 數值
- **COUNT (計數)** 🔢: 計算相同 X 軸 值出現的次數

## 🔧 高級配置

### 環境變數設定

建立 `.env` 檔案進行自訂配置：

```env
PORT=3000
NODE_ENV=production
SNAPSHOT_RETENTION_DAYS=7
NOTION_API_VERSION=2022-06-28
```

### 支援的 Notion 屬性類型

| Notion 屬性      | 支援程度    | 用途     | 範例               |
| ---------------- | ----------- | -------- | ------------------ |
| **Title**        | ✅ 完全支援 | X 軸標籤 | "產品名稱"         |
| **Rich Text**    | ✅ 完全支援 | 標籤     | "描述文字"         |
| **Number**       | ✅ 完全支援 | Y 軸數值 | 100                |
| **Select**       | ✅ 完全支援 | 分類     | "類別 A"           |
| **Multi-select** | ✅ 完全支援 | 標籤     | "標籤 1, 標籤 2"   |
| **Date**         | ✅ 完全支援 | 時間軸   | "2025-07-29"       |
| **Checkbox**     | ✅ 完全支援 | 二元狀態 | true/false         |
| **URL**          | ✅ 完全支援 | 連結     | "https://..."      |
| **Email**        | ✅ 完全支援 | 聯絡方式 | "user@example.com" |
| **Phone**        | ✅ 完全支援 | 聯絡方式 | "+886-123-456-789" |
| **Formula**      | ⚠️ 部分支援 | 計算結果 | 依公式而定         |
| **Rollup**       | ⚠️ 部分支援 | 聚合值   | 依設定而定         |

## 🛠️ 開發指南

### 專案架構

```
notion-echart/
├── 📄 index.html              # 主應用程式介面
├── 🖥️ server.js              # Express 伺服器與 CORS 代理
├── 📦 package.json            # 專案依賴與腳本
├── 📁 js/
│   ├── 🧠 app.js             # 主應用程式邏輯
│   ├── 🔌 notion-api.js      # Notion API 整合
│   └── 📊 chart-renderer.js  # ECharts 圖表渲染
├── 📁 snapshots/             # 快照儲存目錄
│   ├── 📌 .gitkeep          # 保持目錄存在
│   └── 💾 *.json            # 快照檔案
├── 📁 docs/                  # 文件目錄
│   ├── 📋 SPECS.md          # 詳細規格文件
│   └── 🔗 API.md            # API 文件
└── 📖 README.md             # 本文件
```

### 技術堆疊

#### 前端技術

- **HTML5**: 語義化標記，現代 Web 標準
- **CSS3**: Flexbox、Grid、CSS Variables、動畫效果
- **JavaScript ES6+**: 模組化、async/await、箭頭函數
- **ECharts 5.4.3**: 專業圖表渲染引擎

#### 後端技術

- **Node.js 18+**: JavaScript 運行環境
- **Express.js 4.18.2**: 輕量級 Web 框架
- **CORS 2.8.5**: 跨域資源共享
- **node-fetch 3.3.2**: HTTP 請求處理

### 開發腳本

```bash
# 🚀 啟動生產服務器
npm start

# 🔧 啟動開發服務器（自動重啟）
npm run dev

# 📦 安裝依賴
npm install

# 🧪 運行測試
npm test

# 📚 生成文件
npm run docs
```

## 📱 分享與嵌入

### 分享連結格式

生成的分享連結格式：

```
https://yourdomain.com/?snapshot=chart_1690000000000_abc123&embed=true
```

### iframe 嵌入

將圖表嵌入到其他網站：

```html
<iframe
  src="https://yourdomain.com/?snapshot=chart_1690000000000_abc123&embed=true"
  width="800"
  height="600"
  frameborder="0"
>
</iframe>
```

### 快照管理

- **自動清理**: 7 天後自動清理過期快照
- **唯一 ID**: 每個快照都有唯一識別碼
- **永久連結**: 快照儲存後可永久存取

## 🔒 安全性與隱私

### 資料安全

- **Token 保護**: 僅儲存在客戶端 localStorage
- **資料傳輸**: 透過 HTTPS 加密傳輸
- **權限控制**: 僅能存取授權的資料庫

### 隱私保護

- **無追蹤**: 不收集個人識別資訊
- **本地儲存**: 設定僅儲存在您的裝置
- **可撤銷**: 隨時可在 Notion 中撤銷整合權限

## 🐛 疑難排解

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

#### ❌ 分享連結無法開啟

- 確認快照已成功儲存
- 檢查網路連線是否正常
- 嘗試重新生成分享連結

### 技術支援

遇到問題時，請檢查：

1. 瀏覽器控制台中的錯誤訊息
2. Notion 整合設定
3. 資料庫結構和權限
4. 網路連線狀態

## � 相關資源

### 官方文件

- [Notion API 文件](https://developers.notion.com/)
- [ECharts 文件](https://echarts.apache.org/zh/index.html)
- [Express.js 文件](https://expressjs.com/)

### 進階學習

- [詳細規格文件](docs/SPECS.md)
- [API 參考文件](docs/API.md)
- [開發者指南](docs/DEVELOPMENT.md)

## 🤝 貢獻指南

### 如何貢獻

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

### 開發環境設定

```bash
# 克隆你的 fork
git clone https://github.com/yourusername/notion-echart.git
cd notion-echart

# 安裝開發依賴
npm install

# 啟動開發模式
npm run dev
```

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🏆 致謝

感謝以下專案和社群：

- [Notion](https://notion.so) - 提供強大的 API
- [Apache ECharts](https://echarts.apache.org/) - 優秀的圖表庫
- [Express.js](https://expressjs.com/) - 簡潔的 Web 框架
- 所有貢獻者和使用者的回饋

---

**版本**: v2.0.0  
**最後更新**: 2025 年 7 月 29 日  
**開發者**: Development Team  
**支援**: [GitHub Issues](https://github.com/your-repo/notion-echart/issues)
