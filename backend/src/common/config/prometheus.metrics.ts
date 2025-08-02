import { collectDefaultMetrics, Histogram, Registry } from 'prom-client';

// 建立一個 Prometheus Registry
export const prometheusRegistry = new Registry();

// 啟用預設 metrics（如 process、memory 等）
collectDefaultMetrics({ register: prometheusRegistry });

// 建立一個 Histogram 來記錄 API 響應時間
export const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_milliseconds',
  help: 'API 響應時間 (毫秒)',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [10, 50, 100, 200, 300, 400, 500, 1000, 2000, 5000],
  registers: [prometheusRegistry],
});
