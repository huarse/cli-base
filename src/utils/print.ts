// logger utils
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:20

import chalk from 'chalk';
import dateformat from 'dateformat';
import { BaseType } from '../interfaces/types';

export function logger (...args: BaseType[]): void {
  // eslint-disable-next-line
  console.log(...args);
}

const LOG_TYPES = { 'debug': 'gray', 'info': 'cyan', 'success': 'green', 'warn': 'yellow', 'error': 'red' };

/**
 * print console log
 * @param type 日志类型
 * @param msgs 日志内容
 */
export function print(type: 'debug'|'info'|'success'|'warn'|'error', ...msgs: BaseType[]): void {
  const c = LOG_TYPES[type];
  logger(chalk.gray(`[${dateformat(new Date(), 'HH:MM:ss.l')}]`), ...msgs.map(msg => chalk[c](msg)));
}

/**
 * 打印单层的 JSON
 * 多层需要用到 yamljs，暂时不用
 */
export function printJSON(json: Record<string, BaseType>): void {
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      const value = json[key];
      logger(`- ${key}: ${chalk.green(value)}`);
    }
  }
}
