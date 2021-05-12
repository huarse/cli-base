// logger utils
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:20

import fs from 'fs-extra';
import chalk from 'chalk';
import { BaseType } from '../interfaces';
import { timestamp } from './timer';

export function logger (...args: BaseType[]): void {
  // eslint-disable-next-line
  console.log(...args);
}

const LOG_TYPES = { 'debug': 'gray', 'info': 'cyan', 'success': 'green', 'warn': 'yellow', 'error': 'red' };

/**
 * print console log
 * @param type 日志类型
 * @param msgs 日志内容
 * @return 返回一个方法，可以将当前日志添加到文件中
 */
export function print(type: 'debug'|'info'|'success'|'warn'|'error', ...msgs: BaseType[]): (filepath: string) => any {
  const c = LOG_TYPES[type];
  const dateStr = timestamp(new Date(), 'HH:mm:ss.L');
  logger(chalk.gray(`[${dateStr}]`), ...msgs.map(msg => chalk[c](msg)));

  return (filepath: string) => {
    fs.appendFileSync(filepath, `[${dateStr}] [${type}] ${msgs.join(' ')}\n`);
  };
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
