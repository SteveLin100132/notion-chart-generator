import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * 一個攔截器，用於統一 API 回應格式，將回傳資料包裝在一致的結構中，
 * 並加入如成功狀態、HTTP 狀態碼、訊息、時間戳記及追蹤 ID 等中繼資料。
 *
 * @class
 * @template T 回應資料的型別。
 * @implements {NestInterceptor<T, any>}
 *
 * @remarks
 * - 為每個請求產生唯一的 trace ID（可改為從 headers 取得）。
 * - 加入回應產生的時間戳記。
 * - 設定預設的成功訊息與 HTTP 狀態碼。
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  /**
   * 攔截並統一 API 回應格式，加入唯一 trace ID 與時間戳記。
   *
   * @param context - 請求的執行上下文。
   * @param next - 請求流程中的下一個處理器。
   * @returns Observable，發出標準化的回應物件，包含：
   *   - success: 是否成功。
   *   - code: HTTP 狀態碼（預設 200）。
   *   - message: 成功訊息。
   *   - data: 原始回應資料。
   *   - timestamp: 回應產生的 ISO 時間字串。
   *   - traceId: 請求追蹤用的唯一識別碼。
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 將 traceId 加入 response header
    const traceId = uuidv4();

    // 將 traceId 加入 response header
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    response.setHeader('X-Trace-Id', traceId);

    return next.handle();
  }
}
