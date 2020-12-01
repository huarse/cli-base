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
  const MM = M.padStart(2, '0');
  const DD = D.padStart(2, '0');
  const HH = H.padStart(2, '0');
  const mm = m.padStart(2, '0');
  const ss = s.padStart(2, '0');
  const LLL = L.padStart(3, '0');

  const data = { YYYY, YY, Y, MM, M, DD, D, HH, H, mm, m, ss, s, L, LLL };
  return Object.keys(data).reduce((prev, key) => {
    return prev.replace(new RegExp(key, 'g'), data[key]);
  }, format);
}
