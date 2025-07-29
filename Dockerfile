# 使用 Node.js 18 作為基礎映像
FROM node:18-alpine AS base

# 設定工作目錄
WORKDIR /app

# 複製根目錄的 package.json
COPY package*.json ./

# 安裝根目錄依賴
RUN npm ci --only=production && npm cache clean --force

# ================================
# 前端構建階段
# ================================
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# 複製前端相關檔案
COPY frontend/package*.json ./frontend/
COPY frontend/tsconfig.json ./frontend/
COPY frontend/next.config.js ./frontend/
COPY frontend/tailwind.config.js ./frontend/
COPY frontend/postcss.config.js ./frontend/

# 安裝前端依賴
RUN cd frontend && npm ci

# 複製前端源碼
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public

# 構建前端
RUN cd frontend && npm run build

# ================================
# 後端構建階段
# ================================
FROM node:18-alpine AS backend-builder

WORKDIR /app

# 複製後端相關檔案
COPY backend/package*.json ./backend/
COPY backend/tsconfig*.json ./backend/
COPY backend/nest-cli.json ./backend/

# 安裝後端依賴（包括開發依賴用於構建）
RUN cd backend && npm ci

# 複製後端源碼
COPY backend/src ./backend/src

# 構建後端
RUN cd backend && npm run build

# ================================
# 生產環境映像
# ================================
FROM node:18-alpine AS production

# 設定環境變數
ENV NODE_ENV=production
ENV PORT=3000
ENV BACKEND_PORT=3001

# 創建非 root 使用者
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 安裝 dumb-init 用於處理信號
RUN apk add --no-cache dumb-init

# 複製根目錄 package.json 和依賴
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 複製前端構建結果
COPY --from=frontend-builder --chown=nextjs:nodejs /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder --chown=nextjs:nodejs /app/frontend/public ./frontend/public
COPY --from=frontend-builder --chown=nextjs:nodejs /app/frontend/package.json ./frontend/
COPY --from=frontend-builder --chown=nextjs:nodejs /app/frontend/next.config.js ./frontend/

# 複製後端構建結果
COPY --from=backend-builder --chown=nextjs:nodejs /app/backend/dist ./backend/dist
COPY --from=backend-builder --chown=nextjs:nodejs /app/backend/package.json ./backend/

# 安裝生產環境依賴
RUN cd frontend && npm install --omit=dev && npm cache clean --force
RUN cd backend && npm install --omit=dev && npm cache clean --force

# 複製啟動腳本
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# 切換到非 root 使用者
USER nextjs

# 暴露端口
EXPOSE 3000 3001

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# 啟動應用
ENTRYPOINT ["dumb-init", "--"]
CMD ["./docker-entrypoint.sh"]
