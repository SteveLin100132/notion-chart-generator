import { LoggerService } from '@nestjs/common';
import * as log4js from 'log4js';
import { initLog4js } from '../common';

/**
 * Log4jsLoggerService 是一個實現了 LoggerService 接口的日誌服務，
 * 用於在 NestJS 應用中提供基於 log4js 的日誌記錄功能。
 *
 * @class
 */
export class Log4jsLoggerService implements LoggerService {
  /**
   * log4js 記錄器實例，用於輸出日誌。
   */
  private readonly logger: log4js.Logger;

  /**
   * @param context 日誌上下文，默認為 'App'。
   */
  constructor(context = 'App') {
    initLog4js();
    this.logger = log4js.getLogger(context);
  }

  /**
   * 記錄一條日誌消息。
   *
   * @param message 要記錄的消息，可以是任何類型。
   * @param optionalParams 可選的其他參數。
   */
  log(message: any, ...optionalParams: unknown[]) {
    this.logger.info(message, ...optionalParams);
  }

  /**
   * 記錄一條錯誤消息。
   *
   * @param message 要記錄的錯誤消息，可以是任何類型。
   * @param optionalParams 可選的其他參數。
   */
  error(message: any, ...optionalParams: unknown[]) {
    this.logger.error(message, ...optionalParams);
  }

  /**
   * 記錄一條警告消息。
   *
   * @param message 要記錄的警告消息，可以是任何類型。
   * @param optionalParams 可選的其他參數。
   */
  warn(message: any, ...optionalParams: unknown[]) {
    this.logger.warn(message, ...optionalParams);
  }

  /**
   * 記錄一條調試消息。
   *
   * @param message 要記錄的調試消息，可以是任何類型。
   * @param optionalParams 可選的其他參數。
   */
  debug?(message: any, ...optionalParams: unknown[]) {
    this.logger.debug(message, ...optionalParams);
  }

  /**
   * 記錄一條詳細消息。
   *
   * @param message 要記錄的詳細消息，可以是任何類型。
   * @param optionalParams 可選的其他參數。
   */
  verbose?(message: any, ...optionalParams: unknown[]) {
    this.logger.trace(message, ...optionalParams);
  }
}
