// file search
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 20:56

import fs from 'fs-extra';

import { fileIterator } from './iterator';

export interface SearchOptions {
  /** 是否找到所有文件，默认 false，即找到第 1 个就返回 */
  all?: boolean;
  /** 如果指定了 include，则只处理匹配的文件 */
  include?: RegExp;
  /** 匹配规则的文件跳过 */
  exclude?: RegExp;
  /** 文件大小限制(byte)，超过大小的文件不遍历 */
  limit?: number;
  /** 读取文件的编码，默认是 utf-8 */
  encoding?: BufferEncoding;
}

export interface SearchResult {
  filePath: string;
  fileRelativePath: string;
  fileSize: number;
}

/**
 * 从目录中查找内容符合条件的文件
 * @alias search
 * @param src 文件目录
 * @param callback 文件校验规则，传入参数是文件的内容
 * @param options
 * @return
 */
export async function findInFolder(
  src: string,
  callback: (filePath: string, content: string) => boolean,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const result = [];
  await fileIterator(src, (filePath, fileRelativePath) => {
    if (options.include && !options.include.test(fileRelativePath)) return;

    const fileStats = fs.statSync(filePath);

    if (options.limit > 0) {
      if (fileStats.size > options.limit) return;
    }

    const fileContent = fs.readFileSync(filePath, options.encoding || 'utf-8');
    const flag = callback(filePath, fileContent);

    if (flag === true) {
      result.push({ filePath, fileRelativePath, fileSize: fileStats.size });

      // 如果不是找所有文件，则找到一个后立即返回结果
      if (!options.all) return false;
    }

  }, null, options.exclude);

  return result;
}

export const search = findInFolder;
