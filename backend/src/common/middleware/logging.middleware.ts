import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as log4js from 'log4js';
import { initLog4js } from '../config';
import { httpRequestDurationMicroseconds } from '../config/prometheus.metrics';

/**
 * 中介軟體，用於記錄 API 請求和回應的日誌。
 *
 * @class
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  /**
   * 靜態屬性，用於確保 log4js 只初始化一次。
   */
  private static loggerInitialized = false;
  /**
   * log4js 記錄器實例，用於輸出 API 請求和回應的日誌。
   */
  private readonly logger: log4js.Logger;

  constructor() {
    // 如果 log4js 尚未初始化，則進行初始化
    if (!LoggingMiddleware.loggerInitialized) {
      initLog4js();
      LoggingMiddleware.loggerInitialized = true;
    }
    this.logger = log4js.getLogger('API');
  }

  /**
   * 記錄請求和回應的日誌
   *
   * @param {Request} req - Express 請求對象，包含請求的詳細資訊。
   * @param {Response} res - Express 回應對象，用於發送回應。
   */
  private log(req: Request, res: Response) {
    // 獲取請求的 HTTP 方法和原始 URL
    const { method, originalUrl } = req;

    // 獲取回應的狀態碼和追蹤 ID
    const statusCode = res.statusCode;
    const traceId = String(res.getHeader('X-Trace-Id') ?? 'not-set'); // 計算響應時間（毫秒）
    const startTime = (req as any).startTime ?? 0;
    const responseTime = startTime ? Date.now() - startTime : -1;

    // Prometheus: 記錄 API 響應時間
    if (startTime && responseTime >= 0) {
      httpRequestDurationMicroseconds
        .labels(method, originalUrl, String(statusCode))
        .observe(responseTime);
    }

    // 輸出日誌，包含請求方法、原始 URL、狀態碼、追蹤 ID 和響應時間
    const logMessage = `${method} ${originalUrl} - Status: ${statusCode} - TraceId: ${traceId} - ResponseTime: ${responseTime}[ms]`;
    this.logger.info(logMessage);
  }

  /**
   * 中介軟體的主要邏輯，用於處理 API 請求和回應。
   *
   * @param {Request} req - Express 請求對象，包含請求的詳細資訊。
   * @param {Response} res - Express 回應對象，用於發送回應。
   * @param {NextFunction} next - Express 中介軟體的下一個函數，用於將控制權傳遞給下一個中介軟體。
   */
  use(req: Request, res: Response, next: NextFunction) {
    // 記錄請求開始時間
    (req as any).startTime = Date.now();

    // 監聽 response 的 'error' 事件
    res.on('error', () => this.log(req, res));

    // 監聽 response 結束事件
    res.on('finish', () => this.log(req, res));

    next();
  }
}
