// base consts for cli
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 20:02

/** 用户目录 */
export const HOMEPATH: string = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

/** 是否是 windows 环境 */
export const IS_WIN = /^win32|win64$/.test(process.platform);
