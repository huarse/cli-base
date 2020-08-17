// timer utils
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 20:22

/**
 * 睡眠 xx 毫秒
 * @param millseconds 毫秒
 */
export function sleep(millseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), millseconds);
  });
}
