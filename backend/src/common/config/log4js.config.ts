import * as log4js from 'log4js';

/**
 * 默认的 log4js 配置
 */
export const LOGGER_DEFAULT_CONFIG = {
  appenders: {
    out: { type: 'stdout' },
    api: {
      type: 'file',
      filename: 'logs/api.log',
      maxLogSize: 10485760,
      pattern: '.yyyy-MM-dd',
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['out', 'api'],
      level: 'all',
    },
    API: {
      appenders: ['out', 'api'],
      level: 'all',
    },
  },
};

/**
 * 初始化 log4js 配置
 *
 * @param {Object} config - 可选的 log4js 配置，默认为 LOGGER_DEFAULT_CONFIG
 */
export function initLog4js(config = LOGGER_DEFAULT_CONFIG) {
  log4js.configure(config);
}
