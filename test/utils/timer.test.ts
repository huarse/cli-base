// timer utils test case
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/12/02 00:05

import * as utils from '../../src/utils';

test('#timestamp', () => {
  const d = new Date('2020/12/01 18:20:12');
  expect(utils.timestamp(d)).toBe('20201201182012');
  expect(utils.timestamp(d, 'Y-M-D')).toBe('20-12-1');
  expect(utils.timestamp(d, 'YYYY-MM-DD')).toBe('2020-12-01');
  expect(utils.timestamp(d, 'HH:mm:ss')).toBe('18:20:12');
  expect(utils.timestamp(d, 'HH:mm:ss.LLL')).toBe('18:20:12.000');
});
