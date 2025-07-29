#!/bin/sh

# 設定預設環境變數
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3000}
export BACKEND_PORT=${BACKEND_PORT:-3001}

echo "Starting Notion Chart Generator..."
echo "Frontend Port: $PORT"
echo "Backend Port: $BACKEND_PORT"

# 啟動後端服務
cd backend && npm run start:prod &

# 啟動前端服務
cd frontend && npm run start

# 等待所有背景進程結束
wait
