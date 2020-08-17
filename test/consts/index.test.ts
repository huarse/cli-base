// const.test
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 20:05

import { consts } from '../../src';

test('#const', () => {
  expect(consts.HOMEPATH).toBe(process.env.HOME);
});
