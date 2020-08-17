// action.test
// @author MOYAN <moyan@come-future.com>
// @create 2020/08/17 19:56

import { BaseAction } from '../../src'

test('#BaseAction', () => {
  expect(typeof BaseAction).toBe('function');

  expect(typeof BaseAction.prototype).toBe('object');
});
