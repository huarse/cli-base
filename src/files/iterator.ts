// file interator
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:50

import path from 'path';
import fs from 'fs-extra';

/**
 * 遍历文件目录，执行 callback
 * @alias iterator
 */
export async function fileIterator(
  /** 目录路径 */
  src: string,
  /** 执行到文件时的回调，如果返回 false 或 async false，则遍历中止 */
  fileCallback: (filePath: string, fileRelativePath: string) => any,
  /** 执行到目录时的回调 */
  dirCallback?: (dirRelativePath: string) => any,
  /** 忽略的文件 */
  exclude?: RegExp
): Promise<any> {
  return await (async function _recur(currSrc: string): Promise<any> {
    const isDirectory = fs.statSync(currSrc).isDirectory();
    const pathAddon = isDirectory ? '/' : '';

    if (exclude && exclude.test(`${currSrc}${pathAddon}`)) return;

    if (!isDirectory) {
      return await fileCallback(currSrc, path.relative(src, currSrc));
    }

    if (typeof dirCallback === 'function') {
      await dirCallback(path.relative(src, currSrc));
    }
    const dirFiles = await fs.readdir(currSrc);
    for (let i = 0, j = dirFiles.length; i < j; i++) {
      const file = dirFiles[i];
      const recurResult = await _recur(path.resolve(currSrc, file));
      if (recurResult === false) return false;
    }
  })(src);
}

/**
 * alias of fileIterator
 */
export const iterator = fileIterator;

/**
 * 遍历文件目录，同步到目标目录，并对每一个文件执行 callback
 */
export async function dirSyncIterator(
  /** 源文件目录 */
  source: string,
  /** 目标目录 */
  target: string,
  /** 执行到文件时的回调 */
  callback: (sourceFile: string, targetFile: string) => any,
  /** 忽略的文件 */
  exclude?: RegExp
): Promise<any> {
  return fileIterator(source, async (filePath, fileRelativePath) => {
    await callback(filePath, path.resolve(target, fileRelativePath));
  }, async (dirRelativePath) => {
    await fs.ensureDir(path.resolve(target, dirRelativePath));
  }, exclude);
}

/**
 * 统计目录中的文件数量
 * @alias count
 * @param src 目录路径
 * @param exclude 忽略的文件
 */
export async function getFileCount(src: string, exclude?: RegExp): Promise<number> {
  let count = 0;
  await fileIterator(src, () => count++, null, exclude);
  return count;
}

/**
 * alias of getFileCount
 */
export const count = getFileCount;
