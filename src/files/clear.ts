// file clear
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 20:55

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { print, progressBar, render, confirm } from '../utils';

export interface ClearOptions {
  /** 要清除的目录 */
  src: string;
  /** 是否有二次确认 */
  confirm?: boolean;
  /** 二次确认文案 */
  confirmText?: string;
  /** 忽略的文件 */
  exclude?: RegExp;
}

const defaultClearOptions: ClearOptions = {
  src: null,
  confirm: true,
  confirmText: '请确认要清空的目录: {{src}}',
};

export async function clearDir(options: ClearOptions): Promise<boolean> {
  options = {
    ...defaultClearOptions,
    ...options,
  };

  if (!options.src) return false;

  if (options.confirm !== false) {
    const confirmResult = await confirm(render(options.confirmText, options), false);
    if (!confirmResult) return false;
  }

  const originFileList = await fs.readdir(options.src);
  const fileList = originFileList.filter(name => {
    return options.exclude ? !options.exclude.test(name) : true;
  });

  const totalCount = fileList.length;
  print('debug', `clear directory: ${options.src}`);
  const spinner = ora(progressBar(0, totalCount, '文件删除中...')).start();

  for (let i = 0, j = fileList.length; i < j; i++) {
    const filename = fileList[i];
    const filepath = path.resolve(options.src, filename);
    await fs.remove(filepath);
    spinner.text = progressBar(i + 1, totalCount, '文件删除中...');
  }

  spinner.succeed(chalk.green('文件删除完成!'));
  return true;
}
