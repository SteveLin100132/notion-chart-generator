import { Global, Module } from '@nestjs/common';
import { Log4jsLoggerService } from './log4js-logger.service';

/**
 * Log4jsLoggerModule 是一個全局模組，提供基於 log4js 的日誌記錄服務。
 */
@Global()
@Module({
  providers: [Log4jsLoggerService],
  exports: [Log4jsLoggerService],
})
export class Log4jsLoggerModule {}
