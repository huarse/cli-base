// timer utils
// @author CAIHUAZHI <huarse@gmail.com>
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

/**
 * 将 promise 封装成带超时机制的方法
 * @param promise
 * @param timeout 超时时间(ms)
 * @param handler 超时后的处理方法
 */
export function promiseTimer<T>(
  promise: Promise<T>,
  timeout: number,
  handler: (resolve: (value: T) => any, reject?: (reason: any) => any) => void
): Promise<T> {
  if (!timeout) return promise;

  let destroyed = false;
  return new Promise<T>((resolve, reject) => {
    promise.then(result => {
      !destroyed && resolve(result);
    }).catch(error => {
      !destroyed && reject(error);
    });

    setTimeout(() => {
      destroyed = true;
      handler(resolve, reject);
    }, timeout);
  });
}

/**
 * 格式化的时间戳
 * @param date
 * @param format Y: years, M: month, D: date, H: hours, m: minute, s: seconds
 * @example
 * timestamp(null, 'HHmmss'); // 12:29:27
 * timestamp(null, 'YYYY-MM-DD'); // 2020-12-01
 */
export function timestamp(date: Date | number | string = new Date(), format = 'YYYYMMDDHHmmss'): string {
  if (typeof date === 'number' || typeof date === 'string') {
    date = new Date(date);
  } else if (!date) {
    date = new Date();
  }

  const YYYY = `${date.getFullYear()}`;
  const Y = YYYY.substring(2);
  const M = `${date.getMonth() + 1}`;
  const D = `${date.getDate()}`;
  const H = `${date.getHours()}`;
  const m = `${date.getMinutes()}`;
  const s = `${date.getSeconds()}`;
  const L = `${date.getMilliseconds()}`;
  const YY = Y;

  const [MM, DD, HH, mm, ss] = [M, D, H, m, s].map(x => x.padStart(2, '0'));
  const LLL = L.padStart(3, '0');

  const data = { YYYY, YY, Y, MM, M, DD, D, HH, H, mm, m, ss, s, L, LLL };
  return Object.keys(data).reduce((prev, key) => {
    return prev.replace(new RegExp(key, 'g'), data[key]);
  }, format);
}
