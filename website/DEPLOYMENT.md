# Notion Chart Generator 官網部署指令

## 開發環境

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

## Docker 部署

```bash
# 建置 Docker 映像
docker build -t notion-chart-website .

# 執行容器
docker run -d -p 80:80 --name notion-chart-website notion-chart-website

# 停止容器
docker stop notion-chart-website

# 移除容器
docker rm notion-chart-website
```

## 靜態部署

建置後的檔案位於 `dist/` 目錄，可以部署到：

- **Vercel**: 連接 GitHub repo，自動部署
- **Netlify**: 拖拉 `dist/` 資料夾或連接 Git
- **GitHub Pages**: 將 `dist/` 內容推送到 `gh-pages` 分支
- **AWS S3**: 上傳 `dist/` 內容到 S3 bucket 並配置靜態網站託管
- **Azure Static Web Apps**: 連接 GitHub repo 並配置建置設定

## Kubernetes 部署

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notion-chart-website
spec:
  replicas: 3
  selector:
    matchLabels:
      app: notion-chart-website
  template:
    metadata:
      labels:
        app: notion-chart-website
    spec:
      containers:
        - name: website
          image: notion-chart-website:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: notion-chart-website-service
spec:
  selector:
    app: notion-chart-website
  ports:
    - port: 80
      targetPort: 80
  type: LoadBalancer
```

```bash
# 部署到 Kubernetes
kubectl apply -f k8s-deployment.yaml

# 檢查部署狀態
kubectl get pods
kubectl get services

# 取得外部 IP (如果使用 LoadBalancer)
kubectl get service notion-chart-website-service
```

## CI/CD 範例 (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy Website

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: website/package-lock.json

      - name: Install dependencies
        run: |
          cd website
          npm ci

      - name: Build
        run: |
          cd website
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/dist
```
