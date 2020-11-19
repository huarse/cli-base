# CLI BASE TOOLS

![version](https://img.shields.io/npm/v/@irim/cli-base)
![license](https://img.shields.io/npm/l/@irim/cli-base)
![downloads](https://img.shields.io/npm/dw/@irim/cli-base)

Node Cli 基础方法库

## Getting Started

- `$ npm install @irim/cli-base --save`

```ts
import { consts, utils, files } from '@irim/cli-base';
const { print } = utils;

print('debug', 'hello', 'world');
```

## API

### 1. consts 静态常量

| 属性名   | 描述                | 类型      |
| -------- | ------------------- | --------- |
| HOMEPATH | 用户 home 目录      | `string`  |
| IS_WIN   | 是否是 windows 系统 | `boolean` |

### 2. utils 一些常用的方法

| 方法名          | 描述                                 | 参数定义                                                                              | 返回值                         |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------ |
| progressBar     | 返回一个进度条 string                | `recent: number, total?: number, label?: string`                                      | `string`                       |
| print           | 带颜色级别的 console.log             | `type: 'debug'|'info'|'success'|'warn'|'error', ...msgs: BaseType[]`                  | `void`                         |
| printJSON       | 打印单层的 JSON                      | `json: Record<string, BaseType>`                                                      | `void`                         |
| parseProperties | 解析 .properties 文件，返回一个 JSON | `file: string`                                                                        | `Promise<Record<string, any>>` |
| templateRender  | 最简单的模板渲染                     | `tpl: string, data: Record<string, any> = {}`                                         | `string`                       |
| confirm         | node 控制台二次确认                  | `message: string, defaultValue = false`                                               | `Promise<boolean>`             |
| select          | node 控制台用户选择                  | `message: string, options: SelectOptions[] | string[], defaultValue: string | number` | `Promise<string>`              |
| input           | node 控制台用户输入                  | `message: string, defaultValue?: string, validator = (v: string) => any`              | `Promise<string>`              |
| password        | node 控制台密码输入                  | `message: string, defaultValue?: string, validator = (v: string) => any`              | `Promise<string>`              |
| holding         | node 控制台进入等待状态，按回车继续  | `tips = '按回车继续...'`                                                              | `Promise<boolean>`             |

其中 `input` 和 `password` 方法的第 3 个参数是校验方法，入参是输入的值，如果返回 false 或 Error（支持 Promise），则表示校验失败，例如：

```ts
utils.input('请输入用户名', null, async (value) => {
  // 直接校验
  return value === 'zhangsan'; 

  // 返回自定义错误文案
  return value === 'zhangsan' ? true : new Error('校验失败！');

  // 远程校验
  return await request(`api/validate?name=${value}`);
});
```

#### 扩展的类型定义

```ts
/**
 * 基本类型，不算 object、null、undefined
 */
export type BaseType = string | number | boolean | symbol;
```

### 3. files 文件操作相关的常用方法

| 方法名          | 描述                                                      | 参数定义                                                                                        | 返回值                   |
| --------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------ |
| fileIterator    | 遍历目录文件，执行 callback                               | 见下文                                                                                          | `Promise<any>`           |
| dirSyncIterator | 遍历目录文件，同步到目标目录，并对每一个文件执行 callback | 见下文                                                                                          | `Promise<any>`           |
| getFileCount    | 统计目录中的文件数量                                      | `src: string, exclude?: RegExp`                                                                 | `Promise<number>`        |
| copyDir         | 逐个复制目录中的文件                                      | `options: OptionShape`                                                                          | `Promise<any>`           |
| clearDir        | 清空目录(有二次确认)                                      | `options: ClearOptions`                                                                         | `Promise<boolean>`       |
| findInFolder    | 从目录中查找内容符合条件的文件                            | `src: string, callback: (filePath: string, content: string) => boolean, options: SearchOptions` | `Promise<SearchResult[]` |

#### 扩展的类型定义

```ts
// 遍历文件目录，执行 callback
export async function fileIterator(
  /** 目录路径 */
  src: string,
  /** 执行到文件时的回调，如果返回 false 或 async false，则遍历中止 */
  fileCallback: (filePath: string, fileRelativePath: string) => any,
  /** 执行到目录时的回调 */
  dirCallback?: (dirRelativePath: string) => any,
  /** 忽略的文件 */
): Promise<any>;

// 遍历文件目录，同步到目标目录，并对每一个文件执行 callback
export async function dirSyncIterator(
  /** 源文件目录 */
  source: string,
  /** 目标目录 */
  target: string,
  /** 执行到文件时的回调 */
  callback: (sourceFile: string, targetFile: string) => any,
  /** 忽略的文件 */
  exclude?: RegExp
): Promise<any>

// copyDir 方法的参数
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
  contentFormatter?: (content: string, src: string) => Promise<string>;
}

// clearDir 方法的参数 
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

// findInFolder 方法的参数
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
```

## CHANGELOG

<!-- - **version**: change logs -->
- **1.0.0** 发布 1.0 版本，整合并优化 已有能力
- **1.0.4** 优化文档，迁移代码仓库
- **1.1.0** 去掉 `BaseAction` ，简化架构

## LICENSE

BSD-3-Clause License

## Contact Us

[CAIHUAZHI](mailto:huarse@gmail.com)
