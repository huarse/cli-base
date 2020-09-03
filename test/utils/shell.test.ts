// shell test
// @author MOYAN <moyan@come-future.com>
// @create 2020/09/04 00:39

import { utils } from '../../src/index';

test('#shell', () => {
  expect(utils.hasCommand('fnpm')).toBeTruthy();
  expect(utils.hasCommand('foo')).toBeFalsy();
  expect(utils.hasCommand('cp')).toBeTruthy();
});
