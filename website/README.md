# Notion Chart Generator 官網

這是 Notion Chart Generator 的官方網站，使用現代化的網頁技術構建的 Landing Page。

## 技術棧

- **前端框架**: React.js + TypeScript
- **啟動框架**: Vite
- **CSS 框架**: Tailwind CSS
- **UI 組件**: Shadcn UI
- **動畫庫**: Framer Motion
- **圖示**: Lucide React

## 網站結構

網站包含以下幾個主要部分：

### 1. Hero Section (首頁區塊)

- 引人注目的標題和描述
- CTA (Call to Action) 按鈕
- 系統預覽 UI
- 特色功能預覽

### 2. Features Section (功能特色)

- 多種圖表類型
- 資料聚合
- 進階篩選查詢
- 分享功能與 iframe 嵌入
- 圖表匯出
- 表格檢視
- 快照系統

### 3. Tech Stack Section (技術棧)

- 前端技術介紹
- 後端技術介紹
- 部署與工具介紹
- 系統架構圖

### 4. How to Use Section (使用說明)

- 四步驟使用指南
- 多種部署方式說明
- Docker、原始碼、Kubernetes 部署
- 程式碼範例與複製功能

### 5. Footer (頁尾)

- 品牌資訊
- 快速連結
- 外部資源連結
- 版權資訊

## 設計特色

### 色彩設計

- **主色調**: #212529 (深灰色)
- **輔助色調**: #495057 (中灰色)
- **強調色調**: #000000 (黑色)
- **背景色調**: #f8f9fa (淺灰色)
- **文字色調**: #212529 (深灰色)

### 互動效果

- 向下滾動動畫效果
- 懸停動畫
- 平滑滾動
- 毛玻璃效果導航欄
- 響應式設計

### 內容語言

- 內容以繁體中文為主
- 支援多裝置響應式設計

## 開發指令

### 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 啟動開發伺服器

\`\`\`bash
npm run dev
\`\`\`

### 建置生產版本

\`\`\`bash
npm run build
\`\`\`

### 預覽生產版本

\`\`\`bash
npm run preview
\`\`\`

### 程式碼檢查

\`\`\`bash
npm run lint
\`\`\`

## 部署

### 靜態部署

建置後的檔案位於 `dist/` 目錄，可以部署到任何靜態檔案託管服務：

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Azure Static Web Apps

### Docker 部署

\`\`\`bash

# 建置 Docker 映像

docker build -t notion-chart-website .

# 執行容器

docker run -p 80:80 notion-chart-website
\`\`\`

## 目錄結構

\`\`\`
src/
├── components/ # React 組件
│ ├── ui/ # UI 基礎組件
│ │ ├── Button.tsx # 按鈕組件
│ │ └── Card.tsx # 卡片組件
│ ├── Navbar.tsx # 導航欄
│ ├── HeroSection.tsx # 首頁區塊
│ ├── FeaturesSection.tsx # 功能特色
│ ├── TechStackSection.tsx # 技術棧
│ ├── HowToUseSection.tsx # 使用說明
│ └── Footer.tsx # 頁尾
├── hooks/ # React Hooks
│ └── useScrollAnimation.ts # 滾動動畫
├── lib/ # 工具函數
│ └── utils.ts # 通用工具
├── App.tsx # 主應用組件
├── main.tsx # 應用入口
└── index.css # 全域樣式
\`\`\`

## 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個網站！

## 授權

MIT License
