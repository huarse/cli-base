// progress bar string
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:21

import chalk from 'chalk';
import { parseValue } from './parser';

/**
 * 返回一个进度条 string
 * @param recent 当前进度 0 ~ 100
 * @param total 总进度，默认 100
 * @param label prefix
 */
export function progressBar(recent: number, total?: number, label?: string): string {
  if (!total && recent <= 1) {
    total = 100;
    recent = Math.round(recent * 100);
  }

  const percent = recent / total;
  let pieceCount = Math.round(percent * 40);
  let leftCount = 40 - pieceCount;

  let str = '';
  while (pieceCount-- > 0) str += '◼︎';
  while (leftCount-- > 0) str += '◻︎';

  let bar: string;
  if (percent < 0.3) {
    bar = chalk.gray(str);
  } else if (percent < 0.8) {
    bar = chalk.yellow(str);
  } else {
    bar = chalk.green(str);
  }

  return `${label || 'processing...'} ${bar} ${recent} / ${total} \n`;
}

export const getProgressStr = progressBar;

/**
 * 最简单的模板渲染，仅用于替换字符串中的 {{xxx}}
 * @param tpl 模板，变量用 {{xxx}}表示, xxx 支持 a.b 的形式
 * @param data 渲染的数据
 */
export function render(tpl: string, data: Record<string, any> = {}): string {
  return tpl.replace(/\{\{\s?([a-z_$.]+)\s?\}\}/gi, (_, key) => parseValue(data, key));
}

/**
 * @deprecated 请使用 render
 */
export const templateRender = render;
