// copy files
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:52

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { print, getProgressStr } from '../utils';
import { dirSyncIterator, getFileCount } from './iterator';

export interface OptionShape {
  /** 文件来源目录 */
  src: string;
  /** 目标目录 */
  dist: string;
  /** 文件内容替换规则  */
  replacer?: { holder: RegExp; value: string }[];
  /** 忽略的文件 */
  exclude?: RegExp;
  /** 只读文件（不读取&替换的文件） */
  readonlyFile?: RegExp;
  /** 文件名替换方法 */
  fileNameTransfer?: (name: string) => string;
  /** 文件内容格式化方法 */
  contentFormatter?: (content: string, src: string, filename: string) => Promise<string>;
}

const defaultOptions: OptionShape = {
  src: null,
  dist: null,
  exclude: /node_modules\/|build\/|\.DS_Store\/|\.idea\/|\.git\/|\.bak$|\.conf$/,
  readonlyFile: /\.(png|jpe?g|gif|webp|svg|obj|mtl|geojson|gltf|mp4|mp3|min\.js|min\.css)$/,
  fileNameTransfer: (name: string) => name,
};

/**
 * 复制文件目录
 * @param options
 */
export async function copyDir(options: OptionShape): Promise<any> {
  options = {
    ...defaultOptions, ...options,
  };

  if (!options.src || !options.dist) {
    throw new Error('src or dist is empty!');
  }
  if (!fs.existsSync(options.src)) {
    throw new Error(`${options.src} does not exist!`);
  }

  const totalCount = await getFileCount(options.src, options.exclude);
  let tickCount = 0;

  print('debug', `copy directory: ${options.src} ➡︎ ${options.dist}`);
  const spinner = ora(getProgressStr(tickCount, totalCount, '文件复制中...')).start();

  await dirSyncIterator(options.src, options.dist, async (sourceFile, targetFile) => {
    const curDistPathList = targetFile.split(path.sep);
    const newFilename = options.fileNameTransfer(curDistPathList.pop());
    if (!newFilename) {
      throw new Error(`${curDistPathList.join(path.sep)} File name conversion failed and returned empty`);
    }
    targetFile = path.resolve(curDistPathList.join(path.sep), newFilename);

    if (options.readonlyFile.test(sourceFile)) {
      await fs.copyFile(sourceFile, targetFile);
    } else if (options.replacer) {
      let fileContent = await fs.readFile(sourceFile, 'utf8');
      options.replacer.forEach(x => {
        fileContent = fileContent.replace(x.holder, x.value);
      });
      await fs.writeFile(targetFile, fileContent);
    } else if (options.contentFormatter) {
      let fileContent = await fs.readFile(sourceFile, 'utf8');
      fileContent = await options.contentFormatter(fileContent, sourceFile, newFilename);
      await fs.writeFile(targetFile, fileContent);
    } else {
      await fs.copyFile(sourceFile, targetFile);
    }

    spinner.text = getProgressStr(++tickCount, totalCount, '文件复制中...');
  }, options.exclude);

  spinner.succeed(chalk.green('文件复制完成!'));
}
