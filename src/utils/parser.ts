// 各种 parser
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 20:26

import properties from 'properties';

/**
 * 从对象中解析出想要的值
 * @example
 * parseValue({ a: [{ b: 100 }] }, 'a.0.b'); // 100
 */
export function parseValue(data: Record<string, any> = {}, key: string): any {
  return key.split('.').reduce((prev, curr) => prev && prev[curr] || undefined, data);
}

/**
 * 解析 .properties 文件，返回一个 JSON
 * @param file 文件地址
 */
export async function parseProperties(file: string): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    properties.parse(file, { path: true, sections: true }, (err, obj) => {
      if (err) return reject(err);
      resolve(obj);
    });
  });
}
