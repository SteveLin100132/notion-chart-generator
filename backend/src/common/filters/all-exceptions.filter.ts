import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * 全域例外過濾器，用於處理 NestJS 應用程式中所有未捕捉的例外。
 *
 * 此過濾器會攔截 `HttpException` 及一般 `Error` 實例，格式化錯誤回應，
 * 並傳送標準化的 JSON 結構給客戶端。每個錯誤回應都會產生唯一的 `traceId`，
 * 並包含錯誤發生的時間戳記。
 *
 * 回應結構包含：
 * - `success`：永遠為 `false`，表示失敗。
 * - `code`：HTTP 狀態碼。
 * - `message`：錯誤訊息。
 * - `errors`：額外的錯誤細節（如有）。
 * - `timestamp`：錯誤發生的 ISO 時間字串。
 * - `traceId`：用於追蹤錯誤的唯一識別碼。
 *
 * @implements {ExceptionFilter}
 * @catch
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * 處理請求生命週期中拋出的所有例外，並格式化錯誤回應。
   *
   * @param exception - 請求處理過程中拋出的例外物件。
   * @param host - 包含請求與回應物件的 ArgumentsHost。
   *
   * 為每個錯誤回應產生唯一的 trace ID 與時間戳記。
   * 根據例外型別決定 HTTP 狀態碼與錯誤訊息。
   * 若為 HttpException，則擷取狀態碼、訊息與錯誤細節。
   * 若為一般 Error，則使用其訊息。
   * 回應標準化的 JSON 結構，包含 success、code、message、errors、timestamp 與 traceId。
   */
  catch(exception: unknown, host: ArgumentsHost) {
    // 取得請求與回應物件
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 生成唯一的 traceId 與時間戳記
    const traceId = uuidv4();
    const timestamp = new Date().toISOString();
    response.setHeader('X-Trace-Id', traceId);

    // 預設錯誤回應的狀態碼、訊息與錯誤細節
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = null;

    // 根據例外型別設定狀態碼、訊息與錯誤細節
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as any;
        message = r.message ?? message;
        errors = r.errors ?? null;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      code: status,
      message,
      errors,
      timestamp,
      traceId,
    });
  }
}
