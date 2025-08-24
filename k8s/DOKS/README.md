# DigitalOcean Kubernetes (DOKS) 操作指南

## 1. 連線到 DOKS Cluster

1. 安裝 doctl CLI 工具  
   [官方下載頁](https://docs.digitalocean.com/reference/doctl/how-to/install/)
2. 登入 doctl（用 DigitalOcean API Token）
   ```sh
   doctl auth init
   ```
3. 取得 cluster 列表，找到你的 cluster 名稱或 ID
   ```sh
   doctl kubernetes cluster list
   ```
4. 儲存 kubeconfig（用 cluster 名稱或 ID）
   ```sh
   doctl kubernetes cluster kubeconfig save <your-cluster-name-or-id>
   ```
5. 驗證連線
   ```sh
   kubectl get nodes
   ```

## 2. 安裝 nginx ingress controller

1. 執行以下指令安裝 nginx ingress controller：
   ```sh
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml
   ```
2. 等待安裝完成，確認 controller 已啟動：
   ```sh
   kubectl get pods -n ingress-nginx
   ```
3. 取得 EXTERNAL-IP：
   ```sh
   kubectl get svc -n ingress-nginx
   ```

## 3. 設定 Ingress 資源

1. 在 Ingress YAML 設定 ingress class：
   ```yaml
   apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: your-app-ingress
      labels:
        app: your-app
    spec:
      ingressClassName: nginx
      rules:
        - host: your-domain.com
          http:
            paths:
              - path: /
                pathType: Prefix
                backend:
                  service:
                    name: your-app-service
                    port:
                      number: 80
   ```
2. 套用 Ingress 資源：
   ```sh
   kubectl apply -f <your-ingress.yaml>
   ```
3. 驗證 Ingress 是否分配外部 IP：
   ```sh
   kubectl get ingress
   ```

---

## 4. 安裝 cert-manager 並自動申請 HTTPS 憑證

### 安裝 cert-manager

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.2/cert-manager.yaml
```

### 建立 ClusterIssuer（Let's Encrypt）

建立一個 `cluster-issuer.yaml`：

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

套用：

```sh
kubectl apply -f cluster-issuer.yaml
```

### 建立 Certificate 資源

建立一個 `certificate.yaml`：

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: notion-chart-generator-cert
  namespace: default
spec:
  secretName: notion-chart-generator-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  commonName: your-domain.com
  dnsNames:
    - your-domain.com
```

套用：

```sh
kubectl apply -f certificate.yaml
```

### 修改 Ingress 讓其使用 TLS

在 Ingress YAML 加入 TLS 設定：

```yaml
spec:
  tls:
    - hosts:
        - 188-166-204-94.nip.io
      secretName: notion-chart-generator-tls
  rules:
    - host: 188-166-204-94.nip.io
      http:
        paths:
          # ...existing paths...
```

---

**注意事項：**

- 請將 `your-email@example.com` 改為你自己的 email。
- DNS 必須能指向你的 Ingress EXTERNAL-IP（nip.io 會自動處理）。
- cert-manager 會自動申請、續期憑證，無需手動操作。
